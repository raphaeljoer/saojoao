import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { useAddVoteMutation } from '@/modules/2023/shared/api/mutations/useAddVoteMutation';
import { Artist } from '@/modules/2023/shared/components/Artist';
import { TremblingButton } from '@/modules/2023/shared/components/TremblingButton';
import { Loading } from '@/modules/shared/components/Loading';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';

type Props = {
  artist: PublicViewArtist;
};

export const VoteArtist = ({ artist }: Props) => {
  const router = useRouter();
  const addVoteMutation = useAddVoteMutation();
  const [openRecaptchaChallenge, setOpenRecaptchaChallenge] = useState(false);

  const handleRecaptcha = useCallback(
    async (recaptchaTokenV2: any) => {
      window.grecaptcha.ready(async function () {
        const siteKey = process.env.SM_RECAPTCHA_V3_SITE_KEY || '';
        const action = 'add_vote';
        const recaptchaTokenV3 = await window.grecaptcha.execute(siteKey, {
          action
        });

        addVoteMutation.mutate({
          artistId: artist.artistId,
          recaptchaTokenV2,
          recaptchaTokenV3
        });
      });
    },
    [artist.artistId, addVoteMutation]
  );

  useEffect(() => {
    if (addVoteMutation.isLoading) {
      toast(`Estamos verificando o seu voto`, { type: 'info' });
      setOpenRecaptchaChallenge(false);
    }
  }, [addVoteMutation.isLoading]);

  useEffect(() => {
    if (addVoteMutation.isSuccess) {
      toast(`Você votou em ${artist.name}!`, { type: 'success' });
      router.push(`/share/${artist.slug}`);
    }
  }, [addVoteMutation.isSuccess, artist.name, artist.slug, router]);

  useEffect(() => {
    if (addVoteMutation.error) {
      const error = addVoteMutation.error as any;
      const message = error.response?.data?.error?.message;
      toast(`Não foi possível registrar o seu voto${message ? `: ${message}` : ''}`, { type: 'warning', autoClose: 7000 }); //prettier-ignore
      addVoteMutation.reset();
    }
  }, [addVoteMutation, addVoteMutation.error]);

  const handleAddVote = useCallback(() => {
    setOpenRecaptchaChallenge(true);
  }, []);

  return (
    <Artist artist={artist}>
      {!openRecaptchaChallenge && (
        <TremblingButton
          onClick={handleAddVote}
          disabled={addVoteMutation.isLoading || addVoteMutation.isSuccess}
        >
          {addVoteMutation.isLoading || addVoteMutation.isSuccess ? (
            <Loading
              circularProgressProps={{
                color: 'primary',
                size: 24,
                thickness: 4
              }}
            />
          ) : (
            'votar'
          )}
        </TremblingButton>
      )}
      {openRecaptchaChallenge && (
        <ReCAPTCHA
          sitekey={process.env.SM_RECAPTCHA_V2_SITE_KEY || ''}
          onChange={handleRecaptcha}
        />
      )}
    </Artist>
  );
};
