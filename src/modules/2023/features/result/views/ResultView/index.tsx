
import { SerializedArtist } from "@/core/shared/domain/entities/artist";
import { CustomButton } from "@/modules/2023/shared/components/CustomButton";
import { MetaTags } from "@/modules/2023/shared/components/Head";
import { LayoutGrid } from "@/modules/2023/shared/modules/LayoutGrid";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ResultArtist } from "../../components/ResultArtist";
import * as styles from './styles';

type Props = {
  result: SerializedArtist[];
}

export const ResultView = ({ result }: Props) => {
  const router = useRouter();
  
  return (
    <LayoutGrid>
      <MetaTags pageName="Resultado Parcial"/>
      <Stack spacing={3} sx={styles.container}>
        <Typography
          variant="h1"
          align="center"
          fontSize={56}
          fontWeight={400}
        >
          {'Resultado Parcial'}
        </Typography>
        <Stack spacing={2} sx={{width: '100%'}}>
          {result.map((artist) => (
            <ResultArtist key={artist.artistId} artist={artist} />
          ))}
        </Stack>
        <CustomButton onClick={() => router.back()}>
          {'Voltar'}
        </CustomButton>
      </Stack>
    </LayoutGrid>
  )
};