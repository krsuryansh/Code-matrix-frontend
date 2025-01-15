import React from 'react';
import Navbar from '../components/Navbar';

import FooterSection from '../components/FooterSection';
import CodeEditor from '../components/CodeEditor';

const Editor = () => {
  return (
    <div>
      <Navbar />
    <CodeEditor/>
      <FooterSection/>
    </div>
  );
};

export default Editor;