import { Switcher } from "@/modules/shared/components/Switcher";
import { NextPage } from "next";
import PerksPage from "./perks";
import VotePage from "./vote";

const HomePage: NextPage = () => {
  const startDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_START || '');
  const endDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_END || '');
  
  return (
    <Switcher 
      startDate={startDate}
      endDate={endDate}
      onIdle={<PerksPage />}
      onStart={<VotePage />}
      onEnd={<PerksPage />}
    />
  );
};

export default HomePage;