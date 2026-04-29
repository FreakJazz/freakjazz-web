import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Jazmin Rodriguez | Software Engineer & Full Stack Architect',
  description:
    "Portfolio of Jazmin Rodriguez - Software Engineer with 10+ years experience in full-stack development, cloud architecture, and technical leadership. Master's in Software Engineering.",
};

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />

      <HomeView />
    </>
  );
}
