type Props = {
  id: string;
};

export const GoogleTagManagerNoscript = ({ id }: Props) => {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  );
};
