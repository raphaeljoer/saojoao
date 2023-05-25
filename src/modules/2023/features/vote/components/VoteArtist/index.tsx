import { SerializedArtist } from "@/core/shared/domain/entities/artist";
import { useAddVoteMutation } from "@/modules/2023/shared/api/mutations/useAddVoteMutation";
import { Artist } from "@/modules/2023/shared/components/Artist";
import { TremblingButton } from "@/modules/2023/shared/components/TremblingButton";
import { Loading } from "@/modules/shared/components/Loading";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

type Props = {
  artist: SerializedArtist;
};

export const VoteArtist = ({ artist }: Props) => {
  const router = useRouter();
  const addVoteMutation = useAddVoteMutation();
  const [openRecaptchaChallenge, setOpenRecaptchaChallenge] = useState(false);
  
  const handleRecaptcha = useCallback(async (recaptchaTokenV2: any) => {
    window.grecaptcha.ready(async function() {
      const siteKey = process.env.SM_RECAPTCHA_V3_SITE_KEY || '';
      const action = 'add_vote';
      const recaptchaTokenV3 = await window.grecaptcha.execute(siteKey, { action });
      
      addVoteMutation.mutate({ 
        artistId: artist.artistId, 
        recaptchaTokenV2, 
        recaptchaTokenV3
      });
    });

    setOpenRecaptchaChallenge(false);
  }, [artist.artistId, addVoteMutation]);

  const handleClick = useCallback(() => {
    setOpenRecaptchaChallenge(true);
  }, [])

  if(addVoteMutation.isSuccess) {
    toast(`Você votou em ${artist.name}!`);
    router.push(`/share/${artist.slug}`);
  }

  if(addVoteMutation.isError) {
    toast(`Não foi possível registrar o seu voto`);
  }

  return (
    <Artist artist={artist}>
      {!openRecaptchaChallenge && (
        <TremblingButton onClick={handleClick} disabled={addVoteMutation.isLoading || addVoteMutation.isSuccess}>
          {(addVoteMutation.isLoading || addVoteMutation.isSuccess) ? <Loading circularProgressProps={{
            color: "primary",
            size: 24,
            thickness: 4
          }}/> : 'votar'}
        </TremblingButton>
      )}
      {openRecaptchaChallenge && (
        <ReCAPTCHA
          sitekey={process.env.SM_RECAPTCHA_V2_SITE_KEY || ''}
          onChange={handleRecaptcha}
        />
      )}
    </Artist>
  )
}