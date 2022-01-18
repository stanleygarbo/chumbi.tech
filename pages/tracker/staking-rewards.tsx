import moment from "moment";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Pools from "../../components/tracker/staking-rewards/Pools";
import StakingRewards from "../../components/tracker/staking-rewards/StakingRewards";
import TabSelector from "../../components/tracker/staking-rewards/TabSelector";
import { useTheme } from "../../contexts/themeContext";
import { useWallet } from "../../contexts/walletContext";

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
  const { stakingData, current } = useWallet();
  const { colors } = useTheme();

  useEffect(() => {
    let _isMounted = true;
    setData({});

    (async function () {
      if (stakingData) {
        const joined: {
          d90?: IStakingData;
          d180?: IStakingData;
          d365?: IStakingData;
        } = {};

        const stakeData90 = await stakingData({ duration: 90 });
        if (stakeData90 && _isMounted) {
          joined.d90 = stakeData90;
          setData({ d90: stakeData90 });
        }
        const stakeData180 = await stakingData({ duration: 180 });
        if (stakeData180 && _isMounted) {
          joined.d180 = stakeData180;
          setData({ ...joined, d180: stakeData180 });
        }
        const stakeData365 = await stakingData({ duration: 365 });
        if (stakeData365 && _isMounted) {
          joined.d365 = stakeData365;
          setData({ ...joined, d365: stakeData365 });
        }
      }
    })();

    return () => {
      _isMounted = false;
    };
  }, [current, stakingData]);

  return (
    <Container className="tracker" style={{ backgroundColor: colors.bg2 }}>
      <div className="tracker__wrapper">
        <Pools
          pools={[
            {
              name: `${
                90 - moment("01-14-2022", "MM-DD-YYYY").add(90, "days").days()
              } days`,
              APR: data?.d90?.APR,
              formula: "SC / TS * 100",
            },
            {
              name: `${
                180 - moment("01-15-2022", "MM-DD-YYYY").add(180, "days").days()
              } days`,
              APR: data?.d180?.APR,
              formula: "SC / TS * 150",
            },
            {
              name: `${
                365 - moment("01-12-2022", "MM-DD-YYYY").add(365, "days").days()
              } days`,
              APR: data?.d365?.APR,
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
            stakingData={
              data && selectedDuration === 90
                ? data.d90
                : data && selectedDuration === 180
                ? data.d180
                : data && selectedDuration === 365
                ? data.d365
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

  .tracker__wrapper {
    max-width: 1140px;
    margin: 0 auto;
    padding: 20px;
  }

  .tracker__wrapper2 {
    &__cont {
      max-width: 1140px;
      margin: 0 auto;
      padding: 20px;
    }
  }
`;

export default StakingRewardsPage;
