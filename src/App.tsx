/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-cyan-glitch font-terminal scanlines crt-flicker selection:bg-magenta-glitch selection:text-black">
      {/* Header */}
      <header className="border-b-4 border-magenta-glitch bg-black p-4 sticky top-0 z-50 screen-tear">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Terminal className="text-cyan-glitch w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-pixel text-magenta-glitch glitch" data-text="KARNATAKA.SYS">
              KARNATAKA.SYS
            </h1>
          </div>
          <div className="text-sm md:text-base font-pixel text-cyan-glitch hidden sm:block animate-pulse">
            STATUS: CORRUPTED
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tourism Info */}
        <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
          <div className="bg-black border-4 border-cyan-glitch p-6 relative screen-tear">
            <div className="absolute top-0 left-0 bg-cyan-glitch text-black font-pixel text-xs px-2 py-1 -mt-3 ml-4">
              LOG_ENTRY_01
            </div>
            <h2 className="text-2xl font-pixel text-magenta-glitch mb-4 glitch" data-text="DATA_FRAGMENTS">
              DATA_FRAGMENTS
            </h2>
            <p className="text-cyan-glitch text-lg leading-tight mb-6">
              &gt; DECRYPTING REGIONAL DATA...<br/>
              &gt; WARNING: ANOMALIES DETECTED IN SECTOR [KARNATAKA].<br/>
              &gt; PROCEED WITH CAUTION.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="border-l-4 border-magenta-glitch pl-4">
                <strong className="text-magenta-glitch font-pixel text-sm">NODE_01: BENGALURU</strong><br/>
                TECH_CORE. SILICON_VALLEY_OVERRIDE. LALBAGH_BOTANICAL_SIMULATION ACTIVE.
              </li>
              <li className="border-l-4 border-cyan-glitch pl-4">
                <strong className="text-cyan-glitch font-pixel text-sm">NODE_02: MYSURU</strong><br/>
                CULTURAL_ARCHIVE. PALACE_ILLUMINATION_PROTOCOL: ENGAGED.
              </li>
              <li className="border-l-4 border-magenta-glitch pl-4">
                <strong className="text-magenta-glitch font-pixel text-sm">NODE_03: HAMPI</strong><br/>
                RUIN_SECTOR. VIJAYANAGARA_MEMORY_BANK CORRUPTED.
              </li>
            </ul>
          </div>

          <div className="bg-black border-4 border-magenta-glitch p-6 relative">
            <div className="absolute top-0 left-0 bg-magenta-glitch text-black font-pixel text-xs px-2 py-1 -mt-3 ml-4">
              SURVIVAL_GUIDE
            </div>
            <h2 className="text-xl font-pixel text-cyan-glitch mb-4">
              PARAMETERS
            </h2>
            <p className="text-magenta-glitch text-lg leading-tight">
              &gt; OPTIMAL_CYCLE: OCT-APR<br/>
              &gt; FUEL_REQUIREMENTS:<br/>
              &nbsp;&nbsp;- BISI_BELE_BATH.EXE<br/>
              &nbsp;&nbsp;- NEER_DOSA.DAT<br/>
              &nbsp;&nbsp;- MYSORE_PAK.BIN
            </p>
          </div>
        </div>

        {/* Center Column: Game & Player */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="w-full max-w-2xl bg-black p-6 border-4 border-cyan-glitch relative">
            <div className="absolute top-0 right-0 bg-cyan-glitch text-black font-pixel text-xs px-2 py-1 -mt-3 mr-4">
              EXECUTE_SNAKE.SH
            </div>
            <SnakeGame />
            <div className="mt-8 border-t-4 border-magenta-glitch pt-8">
              <MusicPlayer />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
