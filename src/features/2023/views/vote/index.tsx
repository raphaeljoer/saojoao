
import { Grid } from "@mui/material";
import { Option } from "../../components/Option";
import { Layout } from "../../shared/modules/Layout";
import * as styles from './styles';

export const VoteView = () => {
  return (
    <Layout>
      <Grid sx={styles.container}>
        <Option />
        <Option />
        <Option />
      </Grid>
    </Layout>
  )
};