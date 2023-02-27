import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleSettingsProfileOffcanvas } from "@/common/redux/reducers/offconvases";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/common/components/Logo";
import tabs from "@/common/config/druffler-nav-tabs";
import clsx from "clsx";
import styled from "styled-components";
import Select from "@/common/ui/Select";
import { AccountsListResponse, HotelResponse } from "@/common/fetchClient";
import useSWR from "swr";
import { setAccountId, setHotelId, selectDynamic } from "@/common/redux/reducers/dynamic";
import { accountsService } from "@/common/services/accounts-service";
import Button from "@/common/ui/Button";
import { toast } from "react-toastify";

type Props = {};

const DrufflersSidebar: FC<Props> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dynamic = useAppSelector(selectDynamic);
  const { data: accounts } = useSWR<AccountsListResponse>("/api/accounts");
  const currentTab = router.query.tab;
  const [hotels, setHotels] = useState<HotelResponse[]>([]);

  useEffect(() => {
    if (dynamic.accountId)
      accountsService.getHotels(dynamic.accountId).then((res) => setHotels(res.data.data));
  }, [dynamic.accountId]);

  return (
    <>
      <Head>
        <title>{tabs.find(({ title }) => title === currentTab)?.name}</title>
      </Head>
      <SidebarStyled className='d-flex flex-column p-8'>
        <div className='d-flex justify-content-between align-items-center mb-10'>
          <Logo />
          <UserIconStyled
            className='rounded-circle text-white bg-info'
            onClick={() => dispatch(toggleSettingsProfileOffcanvas())}
          >
            VB
          </UserIconStyled>
        </div>

        {/* Accounts select */}
        <Select<{ label: string; value: string; id: string }, false>
          instanceId='accounts-select'
          placeholder='Выберите аккаунт'
          options={
            accounts
              ? accounts.data
                  .filter((account) => !account.is_deleted)
                  .map((account) => ({
                    label: account.name ?? "",
                    value: account.name ?? "",
                    id: account.id ?? "",
                  }))
              : []
          }
          onChange={(option) => {
            if (option?.id) {
              dispatch(setAccountId(option.id));
              dispatch(setHotelId(null));
            }
          }}
        />

        {/* Hotels select */}
        <Select<{ label: string; value: string; id: string }, false>
          instanceId='accounts-select'
          className='mt-3'
          placeholder='Выберите отель'
          isDisabled={!dynamic.accountId}
          value={(() => {
            const hotel = hotels.find((hotel) => hotel.id === dynamic.hotelId);

            return hotel
              ? {
                  value: hotel?.name ?? "",
                  label: hotel?.name ?? "",
                  id: hotel?.id ?? "",
                }
              : undefined;
          })()}
          options={
            hotels
              ? hotels
                  .filter((account) => !account.is_deleted)
                  .map((account) => ({
                    label: account.name ?? "",
                    value: account.name ?? "",
                    id: account.id ?? "",
                  }))
              : []
          }
          onChange={(option) => {
            if (option?.id) dispatch(setHotelId(option.id));
            router.push("/druffler/orders");
          }}
        />

        {/* Hotel menu */}
        {dynamic.hotelId && (
          <nav className='mt-4'>
            {tabs
              .filter((tab) => tab.type === "main")
              .map((tab) => (
                <TabStyled
                  key={tab.title}
                  className={clsx([
                    "d-flex",
                    "rounded-3",
                    "lh-lg",
                    currentTab === tab.title && "active",
                  ])}
                >
                  <Link href={`${tab.urlPath}`}>
                    <Image
                      className='mx-7 my-5'
                      src={tab.icon}
                      width={24}
                      height={24}
                      alt={`${name}`}
                    />
                    {tab.name}
                  </Link>
                </TabStyled>
              ))}
          </nav>
        )}

        <div className='mt-auto'>
          {tabs
            .filter((tab) => tab.type === "root")
            .map((tab) => (
              <TabStyled
                key={tab.name}
                className={clsx([
                  "d-flex",
                  "rounded-3",
                  "lh-lg",
                  currentTab === tab.title && "active",
                ])}
              >
                <Link href={`${tab.urlPath}`}>
                  <Image
                    className='mx-7 my-5'
                    src={tab.icon}
                    width={24}
                    height={24}
                    alt={tab.name}
                  />
                  {tab.name}
                </Link>
              </TabStyled>
            ))}
        </div>

        <div
          onClick={() => {
            if (!dynamic.accountId) toast.warn("Выберите аккаунт");
          }}
        >
          <Button
            className='mt-5 w-100'
            variant='light'
            onClick={() => {
              router.push(`/hotel-add?accountId=${dynamic.accountId}`);
            }}
            disabled={!dynamic.accountId}
          >
            Добавить отель
          </Button>
        </div>
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
  cursor: pointer;
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

export default DrufflersSidebar;
