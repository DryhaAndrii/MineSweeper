import React from 'react';

import './versionSwitcher.scss';

interface ImportMetaEnv {
  VITE_APP_OTHER_VERSION_URL: string;
}

interface ImportMetaWithEnv extends ImportMeta {
  env: ImportMetaEnv;
}

function VersionSwitcher() {
  const otherVersionUrl = (import.meta as ImportMetaWithEnv).env.VITE_APP_OTHER_VERSION_URL;

  return (
    <a href={otherVersionUrl} target='_blank'>
      <button className='version-bt' title='Switch to classic UI'>
        Go to old version
      </button>
    </a>
  );
}

export default VersionSwitcher;
