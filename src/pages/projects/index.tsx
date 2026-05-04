import { CONFIG } from 'src/global-config';

import { ProjectsView } from 'src/sections/projects/view';

// ----------------------------------------------------------------------

const metadata = { title: `Projects - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ProjectsView />
    </>
  );
}
