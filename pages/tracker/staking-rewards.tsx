import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import StakingRewards from "../../components/tracker/staking-rewards/StakingRewards";
import TabSelector from "../../components/tracker/staking-rewards/TabSelector";
import { useWallet } from "../../contexts/walletContext";

const StakingRewardsPage: NextPage = () => {
  const [selectedDuration, setSelectedDuration] = useState<90 | 180 | 365>(90);
  const [data, setData] = useState<{
    staked?: number;
    rewards?: number;
    periodFinish?: any;
    stakingTill?: any;
    stakingCap?: string;
  }>({});
  const { stakingData } = useWallet();

  useEffect(() => {
    let _isMounted = true;
    setData({});

    (async function () {
      if (stakingData) {
        const stakeData = await stakingData({ duration: selectedDuration });
        if (stakeData && _isMounted) {
          setData(stakeData);
        }
      }
    })();

    return () => {
      _isMounted = false;
    };
  }, [selectedDuration]);

  useEffect(() => {
    let _isMounted = true;

    (async function () {
      if (stakingData) {
        const stakeData = await stakingData({ duration: 90 });
        if (stakeData && _isMounted) {
          setData(stakeData);
        }
      }
    })();

    return () => {
      _isMounted = false;
    };
  }, []);

  return (
    <Container className="tracker">
      <TabSelector
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />
      {console.log(data)}
      <StakingRewards data={data} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default StakingRewardsPage;
