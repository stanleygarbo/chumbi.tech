import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Pools from "../../components/tracker/staking-rewards/Pools";
import StakingRewards from "../../components/tracker/staking-rewards/StakingRewards";
import TabSelector from "../../components/tracker/staking-rewards/TabSelector";
import { useTheme } from "../../contexts/themeContext";
import { useWallet } from "../../contexts/walletContext";
import { ITokens } from "../../interfaces/tracker/staking-rewards/IStakingRewards";

type IStakingData = {
  staked?: number;
  rewards?: number;
  periodFinish?: number;
  stakingTill?: number;
  stakingCap?: number;
  APR?: number;
  totalSupply?: number;
};

const StakingRewardsPage: NextPage = () => {
  const [selectedDuration, setSelectedDuration] = useState<90 | 180 | 365>(90);
  const [data, setData] = useState<{
    d90?: IStakingData;
    d180?: IStakingData;
    d365?: IStakingData;
  }>();
  const [totalTokens, setTotalTokens] = useState<ITokens>({
    CHMB: -1,
  });
  const { stakingData, current, totalCHMB } = useWallet();
  const { colors } = useTheme();

  const stakingData90Query = useQuery(
    ["StakingData90", current],
    () => {
      return stakingData ? stakingData({ duration: 90 }) : null;
    },
    {
      staleTime: Infinity,
    }
  );

  const stakingData180Query = useQuery(
    ["StakingData180", current],
    () => (stakingData ? stakingData({ duration: 180 }) : null),
    {
      staleTime: Infinity,
    }
  );

  const stakingData365Query = useQuery(
    ["StakingData365", current],
    () => (stakingData ? stakingData({ duration: 365 }) : null),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    let _isMounted = true;

    (async function () {
      if (stakingData) {
        if (current && _isMounted) {
          const res = await totalCHMB(current);
          if (res) setTotalTokens({ CHMB: res });
        }
      }
    })();

    return () => {
      _isMounted = false;
    };
  }, [current, stakingData, totalCHMB]);

  return (
    <Container className="tracker" style={{ backgroundColor: colors.bg2 }}>
      <Head>
        <title>
          CHMB Staking rewards | Chumbi Technologies | Chumbi Tracker
        </title>
        <meta
          name="description"
          content="Your CHMB Staking rewards. A tracker for Chumbi valley. 
          Chumbi Technologies is a dedicated information site to Chumbi Valley, an enchanting
            role-playing blockchain game built on top of BSC and Polygon."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="tracker__wrapper">
        <Pools
          pools={[
            {
              name: `${
                90 -
                Number(
                  moment
                    .duration(
                      moment(new Date()).diff(
                        moment("Friday, January 14, 2022 11:39:27.738 AM")
                      )
                    )
                    .asDays()
                    .toFixed(0)
                )
              } days`,
              APR: stakingData90Query.data?.APR,
              formula: "SC / TS * 100",
            },
            {
              name: `${
                180 -
                Number(
                  moment
                    .duration(
                      moment(new Date()).diff(
                        moment("Friday, January 14, 2022 11:39:27.738 AM")
                      )
                    )
                    .asDays()
                    .toFixed(0)
                )
              } days`,
              APR: stakingData180Query.data?.APR,
              formula: "SC / TS * 150",
            },
            {
              name: `${
                365 -
                Number(
                  moment
                    .duration(
                      moment(new Date()).diff(
                        moment("Friday, January 14, 2022 11:39:27.738 AM")
                      )
                    )
                    .asDays()
                    .toFixed(0)
                )
              } days`,
              APR: stakingData365Query.data?.APR,
              formula: "SC / TS * 196.72129",
            },
          ]}
        />
      </div>

      <div className="tracker__wrapper2" style={{ background: colors.bg1 }}>
        <div className="tracker__wrapper2__cont">
          <TabSelector
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
          />
          <StakingRewards
            totalTokens={totalTokens}
            // stakingData={
            //   data && selectedDuration === 90
            //     ? data.d90
            //     : data && selectedDuration === 180
            //     ? data.d180
            //     : data && selectedDuration === 365
            //     ? data.d365
            //     : {}
            // }

            stakingData={
              stakingData90Query.data && selectedDuration === 90
                ? stakingData90Query.data
                : stakingData180Query.data && selectedDuration === 180
                ? stakingData180Query.data
                : stakingData365Query.data && selectedDuration === 365
                ? stakingData365Query.data
                : {}
            }
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background: url("/chumbi-pattern.svg");
  background-size: 400%;
  background-repeat: no-repeat;
  height: 100vh;

  .tracker__wrapper2 {
    min-height: calc(100vh - 390px);
    &__cont {
      max-width: 1140px;
      margin: 0 auto;
      padding: 20px;
    }
  }
`;

export default StakingRewardsPage;
