import React, { useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userState } from "../State/user";
import { appName } from "../Service/http";
import MenuItem from "../Components/Menu/Item";
import MenuWrapper from "../Components/Menu/Wrapper";
import Button from "../Components/Button";
import { AuthService } from "../Service/auth";
import { notify } from "../Utils/notify";

export function MainContainer() {
  const [hovered, setHover] = useState(0);
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const MenuList = [{ id: 1, path: "umk", title: t("head.umk") }];

  const logoutHandler = async () => {
    const { data, error, message } = await AuthService.logout();
    if (error) {
      console.log(message);
    }
    if (data) {
      notify(message);
    }
    resetUser();
    navigate(`${appName}/login`);
  };

  if (!user.isAuthenticated) {
    navigate(`${appName}/login`);
  }
  return (
    <>
      <Button logoutHandler={logoutHandler} logoutText={t("logout")} />
      <MenuWrapper>
        {MenuList.map((menu) => {
          return (
            <MenuItem
              key={menu.id}
              menu={menu}
              hovered={hovered}
              handleHover={setHover}
            />
          );
        })}
      </MenuWrapper>
    </>
  );
}
