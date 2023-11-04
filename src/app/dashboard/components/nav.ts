import {
  Dashboard as DashboardIcon,
  PersonOutline as PersonOutlineIcon,
  PersonAddOutlined as PersonAddOutlinedIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  NoteAddOutlined as NoteAddOutlinedIcon,
  Addchart as AddchartIcon,
  PostAddOutlined as PostAddOutlinedIcon,
  ArticleOutlined as ArticleOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  LiveHelp as LiveHelpIcon,
  Logout,
  Handshake as HandshakeIcon,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material';

export const items = [
  {
    name: 'Dashboard',
    Icon: DashboardIcon,
    link: '/Acceuil',
  },

  {
    name: 'Mes Clients',
    Icon: PersonOutlineIcon,
    link: '/Clients',
  },
  {
    name: 'Nouveau Client',
    Icon: PersonAddOutlinedIcon,
    link: '/nouveau-client',
  },
  {
    name: 'Mes Factures',
    Icon: DescriptionOutlinedIcon,
    link: '/Factures',
  },
  {
    name: 'Nouvelle Facture',
    Icon: NoteAddOutlinedIcon,
    link: '/Nouvelle-facture',
  },

  {
    name: 'XL Easy',
    Icon: AddchartIcon,
    link: '/XL-easy',
  },
  {
    name: 'Mes Attestations',
    Icon: ArticleOutlinedIcon,
    link: '/Attestations',
  },
  {
    name: 'Nouvelle Attestation',
    Icon: PostAddOutlinedIcon,
    link: '/Nouvelle-attestation',
  },
  {
    name: 'Mes Rapports',
    Icon: QueryStatsIcon,
    link: '/rapports',
  },
  {
    name: 'Paramètres',
    Icon: SettingsOutlinedIcon,
    link: '/Parametres',
  },

  {
    name: 'FAQ',
    Icon: LiveHelpIcon,
    link: '/FAQ',
  },

  {
    name: 'Nos Partenaires',
    Icon: HandshakeIcon,
    link: '/Partenaires',
  },

  {
    name: 'Se déconnecter',
    Icon: Logout,
    link: '/',
  },
];
