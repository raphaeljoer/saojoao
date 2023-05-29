type Props = {
  votingStartDate: Date;
  votingEndDate: Date;
  releaseWinnerDate: Date;
  onIdle: JSX.Element;
  onVotingStart: JSX.Element;
  onVotingEnd: JSX.Element;
  onReleaseWinner: JSX.Element;
};

export const Switcher = (props: Props) => {
  const now = new Date().getTime();
  const votingStartDate = props.votingStartDate.getTime();
  const votingEndDate = props.votingEndDate.getTime();
  const releaseWinnerDate = props.releaseWinnerDate.getTime();

  if (now < votingStartDate) return props.onIdle;
  if (now > votingStartDate && now < votingEndDate) return props.onVotingStart;
  if (now > votingEndDate && now < releaseWinnerDate) return props.onVotingEnd;
  if (now > releaseWinnerDate) return props.onReleaseWinner;

  return props.onVotingStart;
};
