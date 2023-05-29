import { Balloons } from '@/modules/2023/shared/components/Balloons';
import { CustomButton } from '@/modules/2023/shared/components/CustomButton';
import { MetaTags } from '@/modules/2023/shared/components/Head';
import { LayoutGrid } from '@/modules/2023/shared/modules/LayoutGrid';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as styles from './styles';

export const RulesView = () => {
  const router = useRouter();

  return (
    <LayoutGrid>
      <MetaTags pageName="Regulamento" />
      <Balloons />
      <Stack spacing={3} sx={styles.container}>
        <Typography variant="h1" gutterBottom sx={styles.title}>
          {'REGULAMENTO CONCURSO CULTURAL - TALENTO SÃO JOÃO 2023'}
        </Typography>
        <Stack spacing={3} sx={styles.content}>
          <span>
            <Typography variant="h6" component="h3" gutterBottom>
              {'1. PARTICIPANTES'}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {
                '1.1 Poderão participar deste concurso pessoas físicas residentes em território brasileiro.'
              }
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {
                '1.2 A SUA MÚSICA compromete-se a manter sigilosas as informações pessoais de todos os participantes, fornecidas através do concurso.'
              }
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {
                '1.3 Os interessados poderão participar do concurso através das redes sociais (Instagram e Kwai), observando as seguintes etapas:'
              }
            </Typography>
          </span>
          <span>
            <Typography variant="h6" component="h3" gutterBottom>
              {'2. ETAPAS'}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {'2.1 O Talento São João 2023 é composto por 3 (três) etapas:'}
            </Typography>
          </span>
          <span>
            <Typography variant="body1" component="p" gutterBottom>
              {'Primeira Etapa:'}
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  'Através do Instagram oficial do Sua Música (@suamusica), o público pôde sugerir e recomendar seus artistas preferidos em uma das publicações indicadas. Os artistas participantes 8 (oito) mais marcados e sugeridos do Instagram irão para a semifinal;'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  'Através do Kwai, será criada uma página oficial de destaque do concurso para gravação de conteúdo/vídeo, o qual serão selecionados 2 (dois) artistas participantes, a escolha e critério unicamente do Kwai, que irão diretamente para votação final.'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  'A votação final será composta por 5 (cinco) participantes, dentre eles os 2 (dois) selecionados pelo Kwai.'
                }
              </Typography>
            </Stack>
          </span>
          <span>
            <Typography variant="body1" component="p" gutterBottom>
              {'Segunda Etapa:'}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {
                'Através do Instagram, 8 (oito) artistas participantes mais marcados e sugeridos participarão da semifinal e, por meio de curadoria técnica, que será feita por um júri técnico de especialistas da indústria musical e do ramo do entretenimento, serão selecionados 3 (três) artistas para votação final (a ser divulgado nas redes sociais).'
              }
            </Typography>
          </span>
          <span>
            <Typography variant="body1" component="p" gutterBottom>
              {'Terceira Etapa'}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {
                'Todos os 5 (cinco) finalistas selecionados (Kwai e Instagram) integrarão a terceira etapa do concurso com votação aberta popular. Através do link '
              }
              <a href="https://suamusica.com.br/talento">
                {'https://suamusica.com.br/talento'}
              </a>
              .
              {
                ' A votação iniciará no dia 05/06/2023, às 10h00, e se encerrará no dia 15/06/2023, às 23h59.'
              }
            </Typography>
          </span>
          <span>
            <Typography variant="h6" component="h3" gutterBottom>
              {'3. APURAÇÃO E DIVULGAÇÃO DO VENCEDOR'}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {
                '3.1 Após o encerramento da votação, a divulgação do vencedor será feita através das redes sociais (Instagram e Kwai) no dia 16/06/2023. Sendo certo que o resultado do concurso será irrecorrível.'
              }
            </Typography>
          </span>
          <span>
            <Typography variant="h6" component="h3" gutterBottom>
              {'4. PREMIAÇÃO'}
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '4.1 Se tornará ganhador o participante que tiver o maior número de votos através de votação popular digital no site da organizadora do concurso Talento São João 2023. Sendo certo que a premiação se dará em conjunto com Sua Música e Kwai;'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {'4.2 O prêmio ao vencedor se dará da seguinte forma:'}
              </Typography>
            </Stack>
          </span>
          <span>
            <Typography variant="h5">{'Sua Música e Kwai'}</Typography>
          </span>
          <span>
            <Stack spacing={2}>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '- Contrato de Produção Fonográfica para gravação de um produto musical, que compõe:'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '- 1 (um) álbum composto por (15) faixas, o qual Sua Música configurará como Produtora Fonográfica e o ganhador como Artista Intérprete;'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {'- Gravação de Videoclipe'}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {'- 1 (uma) sessão de fotos promocionais'}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {'- Mídia na Plataforma do Sua Música'}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {'- Mídia na Plataforma do Kwai'}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {'- Troféu'}
              </Typography>
            </Stack>
          </span>
          <span>
            <Typography variant="body1" component="p" gutterBottom>
              {
                'Parágrafo Único: Totalizando o valor equivalente a 150.000,00 (cento e cinquenta mil) em serviços. O detalhamento do valor de cada serviço será especificado no "Contrato de Produção Fonográfica" ao vencedor.'
              }
            </Typography>
          </span>
          <span>
            <Stack spacing={2}>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '4.3 Não será permitido ao contemplado trocar seu prêmio por qualquer outro, tampouco por dinheiro ou outros produtos da Sua Música ou Kwai;'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '4.4 Em caso de desclassificação do vencedor, o prêmio passará para o seguinte colocado, e assim sucessivamente;'
                }
              </Typography>
            </Stack>
          </span>
          <span>
            <Typography variant="h6" component="h3" gutterBottom>
              {'5. DATAS E PRAZOS'}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {
                '5.1 Os participantes finalistas serão divulgados no dia 05/06/2023.'
              }
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {'5.2 A divulgação do resultado será feita no dia 16/06/2023.'}
            </Typography>
          </span>
          <span>
            <Typography variant="h6" component="h3" gutterBottom>
              {'6. DA ACEITAÇÃO'}
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '6.1 O participante, ao assinar o Contrato de Participação em Concurso Cultural, conforme condições estabelecidas, estará concordando e anuindo de forma tácita com todas as disposições constantes deste regulamento.'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '6.2 O interessado, no ato da participação deste concurso, estará automaticamente autorizando a Sua Música e Kwai, cedendo, para tanto, os direitos autorais de voz/som e imagem, de modo gratuito, definitivo e irrevogável, liberando também a utilização de seu nome e imagens/fotos publicadas nas redes sociais da Sua Música e Kwai, bem como no site de divulgação de votação popular, sob o domínio: '
                }
                <a href="https://suamusica.com.br/talento">
                  {'https://suamusica.com.br/talento'}
                </a>
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '6.3 É fundamental ter um perfil válido nas redes sociais (Instagram e Kwai) para participar do concurso. Perfis falsos, criados apenas para participar de promoções, serão automaticamente desclassificados.'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '6.4 Fica convencionado entre as partes que todo e qualquer participante que tiver atitudes discriminatórias (questões raciais, de gênero, orientação sexual, nacionalidade, religião, situação econômica ou qualquer outro aspecto social) ou esteja envolvido em qualquer caso, situação e/ou evento de repercussão pública que possa implicar em descrédito e/ou abalo à honra e/ou credibilidade, estando estas apuradas e comprovadas, estará automaticamente desclassificado;'
                }
              </Typography>
            </Stack>
          </span>
          <span>
            <Typography variant="h6" component="h3" gutterBottom>
              {'7. DISPOSIÇÕES GERAIS'}
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '7.1 A participação neste concurso é voluntária e gratuita, não estando condicionada, em hipótese alguma, à sorte, ao pagamento de preço e/ou à compra de produtos ou uso de qualquer bem, direito ou serviço pelo participante, de acordo com o artigo 3º, inciso II, da Lei 5768/71 e com o artigo 30, do Decreto 70.951/72.'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '7.2 A SUA MÚSICA não será responsável por quaisquer problemas técnicos, falhas de conexão ou outros impedimentos que possam prejudicar a participação do Participante no Concurso.'
                }
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {
                  '7.3 A SUA MÚSICA, responsável pelo Concurso, reserva-se o direito de, a qualquer momento, realizar alterações no regulamento, bem como na data, horário e demais condições do Concurso. Tais alterações serão divulgadas por meio dos canais oficiais do Concurso (redes sociais), e o Participante se compromete a acompanhar as atualizações.'
                }
              </Typography>
            </Stack>
          </span>
        </Stack>
        <CustomButton onClick={() => router.back()}>Voltar</CustomButton>
      </Stack>
    </LayoutGrid>
  );
};
