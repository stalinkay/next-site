import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import Highlight from 'react-highlight';

import Container from '../container';
import Window from '../window';
import Site from './svg/site';
import TitleOverlay from './svg/title-overlay';
import AvatarOverlay from './svg/avatar-overlay';
import SidebarOverlay from './svg/sidebar-overlay';
import Checkmark from '../icons/checkmark';

const files = [
  {
    name: 'TitleBlock.js',
    content: `export default function TitleBlock({ title, description }) {
  return (
    <div>
      <h1>{ title }</h1>
      <p>{ description }</p>

      <style jsx>{\`
        h1 { font-size: 32px; margin-bottom: 16px; }
        p { font-size: 16px; }
      \`}</style>
    </div>
  )
}`
  },
  {
    name: 'Avatar.js',
    content: `export default function Avatar({ src }) {
  return (
    <>
      <img src={ src } />

      <style jsx>{\`
        img { border-radius: 50%; width: 24px; height: 24px; }
      \`}</style>
    </>
  )
}`
  },
  {
    name: 'Sidebar.js',
    content: `export default Sidebar({ name, items }) {
  return (
    <div>
      <h2>{ name }</h2>
      { items.map(({ data }) => <span>{data}</span>) }

      <style jsx>{\`
        h2 { font-size: 24px; }
        span { font-weight: 600; }
      \`}</style>
    </div>
  )
}`
  }
];

const Anim = posed.div({
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
});

export default () => {
  const [selected, select] = React.useState(0);
  const { name } = files[selected];

  React.useEffect(() => {
    if (window.innerWidth < 640) {
      select(1);
    } else {
      const interval = setInterval(() => {
        select(current => ++current % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Container wide dark>
      <div className="col">
        <ul>
          <li>
            <Checkmark inverse />
            <h4>Component Friendly</h4>
          </li>
          <li>
            <Checkmark inverse />
            <h4>Fully-Featured CSS</h4>
          </li>
          <li>
            <Checkmark inverse />
            <h4>SSR Enabled</h4>
          </li>
          <li>
            <Checkmark inverse />
            <h4>Developer Focused</h4>
          </li>
        </ul>

        <div className="flex">
          <div className="terminal-container">
            <Window
              title={name}
              height={297}
              mobileHeight={275}
              backgroundColor="black"
            >
              <PoseGroup>
                {selected === 0 && (
                  <Anim key={0}>
                    <Highlight className="javascript">
                      {files[0].content}
                    </Highlight>
                  </Anim>
                )}
                {selected === 1 && (
                  <Anim key={1}>
                    <Highlight className="javascript">
                      {files[1].content}
                    </Highlight>
                  </Anim>
                )}
                {selected === 2 && (
                  <Anim key={2}>
                    <Highlight className="javascript">
                      {files[2].content}
                    </Highlight>
                  </Anim>
                )}
              </PoseGroup>
            </Window>
          </div>

          <div className="site-container">
            <Site />
            <div className="overlay-container">
              <PoseGroup>
                {selected === 0 && (
                  <Anim key={0}>
                    <TitleOverlay />
                  </Anim>
                )}
                {selected === 1 && (
                  <Anim key={1}>
                    <AvatarOverlay />
                  </Anim>
                )}
                {selected === 2 && (
                  <Anim key={2}>
                    <SidebarOverlay />
                  </Anim>
                )}
              </PoseGroup>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          ul {
            align-self: stretch;
            padding: 0 1rem;
            margin: 2.5rem 0 0 0;
            display: flex;
            list-style-type: none;
            align-items: center;
            justify-content: space-between;
          }
          li {
            display: flex;
            align-items: center;
          }
          h4 {
            height: 2rem;
            margin: 0 0 0 0.5rem;
          }
          img {
            margin-top: 1rem;
            width: 90%;
          }
          .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
            margin: 2rem 1rem;
          }
          .terminal-container {
            width: 29.5rem;
          }
          .terminal-container :global(pre) {
            margin: 0;
            white-space: pre-wrap;
            font-size: 12px;
            padding: 0 1rem;
          }
          .site-container {
            display: flex;
            position: relative;
          }
          .overlay-container {
            position: absolute;
            top: 32px;
            left: 0px;
          }
          .col {
            margin: 0 auto;
            max-width: 64rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .terminal-container :global(.hljs-keyword),
          .terminal-container :global(.hljs-params),
          .terminal-container :global(.hljs-name),
          .terminal-container :global(.hljs-tag) {
            font-weight: 600;
          }

          @media screen and (max-width: 1024px) {
            ul {
              align-self: initial;
              flex-direction: column;
              align-items: flex-start;
              margin: 0 1rem 2.5rem 1rem;
            }
            li {
              margin: 1rem 0;
            }
            .col {
              align-items: center;
              flex-direction: column-reverse;
            }
            .flex {
              align-self: initial;
            }
            .site-container {
              display: none;
            }
          }

          @media screen and (max-width: 540px) {
            .terminal-container {
              width: 18rem;
            }
          }
        `}
      </style>
    </Container>
  );
};
