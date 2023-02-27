import { FC } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { toggleSettingsProfileOffcanvas } from "@/common/redux/reducers/offconvases";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import Button from "@/common/ui/Button";
import Logo from "@/common/components/Logo";

import tabs from "@/config/admin-nav-tabs.json";

import clsx from "clsx";
import styled from "styled-components";

type Props = {};

const Sidebar: FC<Props> = () => {
  // const swrResult = useSWR("/api/accounts");
  // const { data: hotels, error, isLoading } = swrResult;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentTab = router.query.tab;

  // if (error) {
  //   return <>Произошла ошибка</>;
  // }

  // if (isLoading) {
  //   return <>Загрузка</>;
  // }

  return (
    <>
      <Head>
        <title>{tabs.find(({ title }) => title === currentTab)?.name}</title>
      </Head>
      <SidebarStyled className='d-flex flex-column justify-content-between p-8'>
        <div>
          <div className='d-flex justify-content-between align-items-center mb-10'>
            <Logo />
            <UserIconStyled
              className='rounded-circle text-white bg-info'
              onClick={() => dispatch(toggleSettingsProfileOffcanvas())}
            >
              VB
            </UserIconStyled>
          </div>
          {/* <Dropdown items={hotels.data} itemClickHandler={() => console.log("click")} /> */}
          <nav>
            {tabs.map(({ name, iconPath, urlPath, title }) => (
              <TabStyled
                key={name}
                className={clsx(["d-flex", "rounded-3", "lh-lg", currentTab === title && "active"])}
              >
                <Link href={`/${urlPath}`}>
                  <Image
                    className='mx-7 my-5'
                    src={iconPath}
                    width={24}
                    height={24}
                    alt={`${name} icon`}
                  />
                  {name}
                </Link>
              </TabStyled>
            ))}
          </nav>
        </div>
        {/* // TODO обернуть в Link ведущий на страницу добавления отеля */}
        <Button variant='light'>
          <Image src={"/svg/plus.svg"} width={24} height={24} alt={"plus"} />
          Добавить отель
        </Button>
      </SidebarStyled>
    </>
  );
};

const UserIconStyled = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarStyled = styled.aside`
  height: 100vh;
  min-width: 320px;
  background: #f3f4f5;
`;

const TabStyled = styled.li`
  height: 48px;
  font-weight: 500;

  &.active {
    background: #dcdfe3;

    &:hover {
      filter: brightness(0.9);
    }
  }

  &:hover {
    background: #e6e8eb;
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const ButtonStyled = styled(Button)`
  height: 44px;

  &:hover {
    filter: brightness(0.95);
  }
`;

export default Sidebar;
