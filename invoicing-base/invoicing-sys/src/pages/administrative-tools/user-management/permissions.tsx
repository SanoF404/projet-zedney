import Permissions from '@/components/administrative-tools/permissions/Permissions';
import UserManagementSettings from '@/components/administrative-tools/UserManagementSettings';
import React from 'react';

export default function Page() {
  return (
    <UserManagementSettings>
    <Permissions />
    </UserManagementSettings>
  );
}
