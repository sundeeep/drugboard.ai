"use client";
import React, { useEffect, useState } from 'react'
import KnowledgePathways from './components/KnowledgePathways';
import SmartStream from './components/SmartStream';
import EurekaMoments from './components/EurekaMoments';
import SynergyFinder from './components/SynergyFinder';
import ResearchPulse from './components/ResearchPulse';
import {Tabs, Tab} from "@nextui-org/react";
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import {Newspaper} from 'lucide-react';
import {GraduationCap} from 'lucide-react';
import Header from './components/Header';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';
import { isObjEmpty } from '@/utils/Obj.util';
import RegisteredConferences from './components/RegisteredConferences';
import ResearchPaperAnalyzer from './components/ResearchPaperAnalyzer';
import ConferencesListing from './components/ConferencesListing';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(()=>{
    const getCurrentUser = async() => {
      try {
        const auth = new AppWriteAuth();
        const user = await auth.getUser();
        if(!isObjEmpty(user)){
          setCurrentUser(user);
          // console.log(user);
        }
        setPageLoading(false);
      } catch (error) {
        // navigate.push("/onboarding");
        setPageLoading(false);
        console.log("Error Type: ",error.type);
        console.log("Error: ",error);
      }
   }
    getCurrentUser();
  }, []);
  


    return (
      <>
        {
          !pageLoading ? (
            <div className={`${isDarkMode ? "bg-dark" : "bg-light"}  bg-cover bg-center bg-fixed  w-full flex flex-col items-stretch p-3 gap-3`}>
              <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>     
              <main className='w-full flex flex-col items-center justify-center gap-[12px]'>
                {/* <section className='h-[100vh] w-full flex flex-row gap-[12px]'>
                  <div className='h-[100vh] w-1/2 rounded-lg border-2 border-white bg-white/60 backdrop-blur-3xl p-2'>
                    <Tabs
                      color="secondary" variant="bordered"
                      radius="full"
                      className="flex items-center justify-center w-full"

                      size="lg"
                      aria-label="Tabs form"
                      selectedKey={selected}
                      onSelectionChange={setSelected}
                    >
                      <Tab key={"smartstream"} title={
                        <div className="flex items-center space-x-2">
                          <TipsAndUpdatesRoundedIcon/>
                          <span className="font-bold font-cursive">Smart Stream</span>
                        </div>
                      }>
                        <SmartStream />
                      </Tab>
                      <Tab key={"eurekamoments"} title={
                        <div className="flex items-center space-x-2">
                          <Newspaper />
                          <span className="font-bold font-cursive">Eureka Moments</span>
                        </div>
                      }>
                        <EurekaMoments />
                      </Tab>
                    </Tabs>
                  </div>

                  <div className='h-[100vh] w-1/2 rounded-lg border-2 border-white bg-white/60 backdrop-blur-3xl'>
                    <div className="w-full px-3 py-2 flex items-center justify-between border-b-2 border-white">
                          <div className="flex items-center gap-2 text-black">
                              <GraduationCap />
                              <h1 className="font-bold font-cursive text-lg">Knowledge Pathways</h1>
                          </div>
                    </div>
                  </div>
                </section> */}
                <section className='w-full flex gap-3'>
                  <ResearchPulse currentUserData={currentUser} setCurrentUserData={setCurrentUser}/>
                  <ConferencesListing />
                </section>
                <KnowledgePathways />
              </main>
            </div>
          ):
            (
              <div className='h-screen w-full flex items-center justify-center'>
                <h1 className='text-white !font-black !text-5xl'>Page is Loading...</h1>
              </div>
            )
        }
      </>
        
    )
  
}

export default Home;