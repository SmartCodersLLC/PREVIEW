import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userState } from "../State/user";
import { appName } from "../Service/http";
import MenuItem from "../Components/Menu/Item";
import MenuWrapper from "../Components/Menu/Wrapper";

export function MainContainer() {
  const [hovered, setHover] = useState(0);
  const user = useRecoilValue(userState);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const MenuList = [{ id: 1, path: "umk", title: t("head.umk") }];

  if (!user.isAuthenticated) {
    navigate(`${appName}/login`);
  }
  return (
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
  );
}
