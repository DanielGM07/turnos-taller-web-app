import * as React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventNoteIcon from '@mui/icons-material/EventNote'
import PeopleIcon from '@mui/icons-material/People'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

export default function useApp() {
  const NAVIGATION = React.useMemo(
    () => [
      { kind: 'header', title: 'General' },
      {
        kind: 'page',
        segment: 'dashboard',
        title: 'Resumen general',
        icon: <DashboardIcon />,
      },
      {
        kind: 'page',
        segment: 'appointments',
        title: 'Agenda de turnos',
        icon: <EventNoteIcon />,
      },
      {
        kind: 'page',
        segment: 'customers',
        title: 'Clientes',
        icon: <PeopleIcon />,
      },
      {
        kind: 'page',
        segment: 'vehicles',
        title: 'Vehículos',
        icon: <DirectionsCarFilledIcon />,
      },
      { kind: 'divider' },
      { kind: 'header', title: 'Configuración' },
      {
        kind: 'page',
        segment: 'settings',
        title: 'Preferencias',
        icon: <SettingsOutlinedIcon />,
      },
    ],
    []
  )

  return { NAVIGATION }
}
