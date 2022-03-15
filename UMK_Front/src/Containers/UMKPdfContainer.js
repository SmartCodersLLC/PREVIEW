import React, { useEffect, useState, useRef } from 'react'
import { Report1Service } from '../Service/report1'
import { Report5Service } from '../Service/report5'
import YearList from '../Service/YearList'
import { useReactToPrint } from "react-to-print";
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import _ from "lodash";

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function UMKContainer() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    const [year, setYear] = useState({ value: YearList[4].id, label: YearList[4].name })
    const [countries, setCountries] = useState([])
    const [announces, setAnnounces] = useState([])
    const [ranjir, setRanjir] = useState([])
    const [directions, setDirections] = useState([])
    const [reload, setReload] = useState(false)
    const [id_country, setIdCountry] = useState(0)
    const [direction, setDirection] = useState(0)
    const [announcement_name, setAnnouncement_name] = useState(0)

    const Ranjir = direction ? ranjir?.filter(a => a.id_direction == direction.value) : ranjir //ranjir filter by direction
    const Vsego = Ranjir?.length ? (Ranjir?.map((a) => a.byDirection.length)).reduce((a, b) => a + b) : 0

    useEffect(() => {
        Report1Service.postCountries({ year: year.label }).then(countries => setCountries(countries.rows))
    }, [year])

    const handleYear = (selected) => {
        setYear(selected)
        handleCountry([])
    }
    const handleCountry = (selected) => {
        setIdCountry(selected)
        handleAnnounce([])
        Report1Service.postAnnounces({ id_country: selected.value, year: year.label }).then(
            response => {
                // if (response.rowCount == 1) {
                //     handleAnnounce({ value: response.rows[0].id_announcement, label: response.rows[0].announcement_name })
                // }
                setAnnounces(response.rows)
            }
        )
    }
    const handleAnnounce = (selected) => {
        setAnnouncement_name(selected)
        Report5Service.postRanjir({ announcement_id: selected.value }).then(ranjir => {
            setTimeout(() => {
                let RanjirGroup = _.chain(ranjir?.rows)
                    .groupBy("id_direction")
                    .map((value, key) => ({
                        direction: value[0].direction,
                        id_direction: value[0].id_direction,
                        byDirection: value
                    }))
                    .sortBy('ball')
                    .value()
                setRanjir(RanjirGroup)
            }, 50);
        }).then()
        Report5Service.postDirections({ year: year.label, announcement_id: selected.value }).then(directions => setDirections(directions.rows)).then()
        setReload(!reload)
        setDirection(0)
    }

    const handleDirection = (selected) => {
        setDirection(selected)
    }

    function generatePDF() {
        var ranjir = {
            content:
                [
                    {
                        text: 'Ранжированный список аппликантов , участвующих в конкурсе на ' + announcement_name?.label, style: 'header'
                    },
                    {
                        text: 'Зарегистрировано: ' + Vsego, style: 'subheader', alignment: 'center'
                    },
                    {
                        style: 'tableExample',
                        table: {
                            borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
                            widths: [40, '*', 100],
                            body: [
                                [
                                    { text: '№', style: 'tableHeader', alignment: 'center' },
                                    { text: 'Шифр', style: 'tableHeader', alignment: 'center' },
                                    { text: 'Средний балл', style: 'tableHeader', alignment: 'center' }
                                ]
                            ]
                        }
                        ,
                        layout: {
                            hLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                            },
                            vLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                            }
                        }
                    },
                    ...Ranjir?.map((dir) => {
                        return (
                            {
                                table:
                                {
                                    widths: [40, '*', 100],
                                    body: [
                                        [
                                            { text: dir.direction, colSpan: 3, alignment: 'center', style: 'tableSubHeader' },
                                            {},
                                            {}
                                        ],
                                        ...dir.byDirection.map((item, index) => {
                                            return (
                                                [
                                                    { text: index + 1, alignment: 'center', style: item.status == 5 || item.status == 6 ? 'bestRows' : 'Rows' },
                                                    { text: item.shifr, alignment: 'center', style: item.status == 5 || item.status == 6 ? 'bestRows' : 'Rows' },
                                                    { text: item.ball, alignment: 'center', style: item.status == 5 || item.status == 6 ? 'bestRows' : 'Rows' }
                                                ]
                                            )
                                        })
                                    ]
                                }
                                ,
                                layout: {
                                    hLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                                    },
                                    vLineWidth: function (i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
                                    }
                                }
                            }
                        )
                    }
                    )
                ],

            styles:
            {
                header:
                {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 10],
                    alignment: 'center'
                },
                subheader:
                {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 5, 0, 5],
                    alignment: 'center'
                },
                tableHeader:
                {
                    fillColor: '#718096',
                    color: 'white',
                },
                tableSubHeader:
                {
                    fillColor: '#E2E8F0',
                },
                Rows: {
                    bold: false,
                },
                bestRows: {
                    fillColor: '#D3FCE0',
                    bold: false
                }
            },
            footer: function (currentPage, pageCount) {
                var t = {
                    layout: "noBorders",
                    fontSize: 8,
                    margin: [25, 0, 25, 0],
                    table: {
                        widths: ["*"],
                        body: [
                            [
                                { text: currentPage.toString() + "/" + pageCount, alignment: 'right' }
                            ]
                        ]
                    }
                };

                return t;
            }
        };
        pdfMake.createPdf(ranjir).download(`${announcement_name?.label}`);
    }

    return (
        <div className='Report7_Wrapper'>
            <div className='Selectors_Wrapper' >
                <NavLink to='/report'>
                    <button title="Назад">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </NavLink>
                <Select
                    className='Select'
                    classNamePrefix="my_select"
                    value={year}
                    isSearchable={false}
                    placeholder='Выберите год'
                    onChange={handleYear}
                    options={YearList?.map(d => ({ 'value': d.id, 'label': d.name }))}
                />
                <Select
                    className='Select'
                    classNamePrefix="my_select"
                    value={id_country}
                    isSearchable={false}
                    placeholder='Выберите страну'
                    onChange={handleCountry}
                    options={countries?.map(d => ({ 'value': d.id_country, 'label': d.country_name }))}
                />
                <Select
                    className='Select'
                    classNamePrefix="my_select"
                    value={announcement_name}
                    isSearchable={false}
                    isDisabled={id_country?.value ? false : true}
                    placeholder='Выберите конкурс'
                    onChange={handleAnnounce}
                    options={announces?.map(d => ({ 'value': d.id_announcement, 'label': d.announcement_name }))}
                />
                <Select
                    className='Select'
                    classNamePrefix="my_select"
                    isSearchable={false}
                    value={direction}
                    placeholder='Выберите напрвление'
                    isDisabled={announces?.length ? false : true}
                    isClearable
                    onChange={handleDirection}
                    options={directions?.map(d => ({ 'value': d.id, 'label': d.direction }))}
                />
            </div>
            {Ranjir?.length ? <div className='ButtonsWrapper'>
                <button onClick={handlePrint} title="Печать">
                    <i className="fa fa-print"></i>
                </button>
                <button title="Сохранить как PDF" onClick={generatePDF}>
                    <i className="far fa-file-pdf" ></i>
                </button>
            </div> : null}
            <div className='A4' id="A4" ref={componentRef}>
                <h4>{announcement_name.value ? 'Ранжированный список аппликантов , участвующих в конкурсе на ' : null}
                    {announcement_name ? (announcement_name?.label?.split(' ')?.map((a, i) => <span key={i} >{a + ' '}</span>)) : null}</h4>
                <h5 style={{ margin: '10px' }}>{ranjir?.length ? 'Зарегистрировано: ' + Vsego : null}</h5>
                <table >
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Шифр</th>
                            <th>Средний балл</th>
                        </tr>
                    </thead>

                    {Ranjir?.map((dir, dir_ind) => {
                        return (
                            <tbody key={'dir' + dir_ind}>
                                <tr className='DirectionName'>
                                    <th colSpan={'3'}>{dir.direction}</th>
                                </tr>
                                {dir?.byDirection.map((item, index) => {
                                    return (
                                        <tr key={'ranj' + index}
                                            className={item.status == 5 || item.status == 6 ? 'bestRows' : ''}
                                        >
                                            <td>{index + 1} </td>
                                            <td >{item.shifr}</td>
                                            <th>{item.ball}</th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        )
                    })}

                </table>
            </div>
        </div >
    )
}
