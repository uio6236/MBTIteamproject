import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';

export default function Layout() {
  return (
    <div>
      <Outlet />
      <TabBar />
    </div>
  );
}