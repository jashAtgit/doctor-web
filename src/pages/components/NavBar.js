import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
  Image,
} from "@mantine/core"
import {
  IconSettings,
  IconLogout,
  IconUsers,
  IconKey,
} from "@tabler/icons-react"



const useStyles = createStyles(theme => ({

  navbar: {
    background: `#6972FF`,
    backgroundImage: `url("wavy-background.png")`,
    backgroundRepeat: "no-repeat",
    },


  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    ),
    color: theme.white,
    fontWeight: 700
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    )}`
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    )}`
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    paddingBottom: theme.spacing.md,
    fontSize: theme.fontSizes.lg,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: 100,
    fontWeight: 500,
    marginBottom: 5,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      )
    }
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.25
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9
      }
    }
  }
}))

const data = [
  { link: "", label: "Patients", icon: IconUsers },
  { link: "", label: "My Profile", icon: IconSettings },
  { link: "", label: "Change Password", icon: IconKey }
]

function NavBarSimple({clearToken, setToken, active, setActive}) {


  const { classes, cx } = useStyles()
  

  const links = data.map(item => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active
      })}
      href={item.link}
      key={item.label}
      onClick={event => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    
    <Navbar  width={{sm:350}} p="md" className={classes.navbar}>
      <Navbar.Section grow>
      <Group className={classes.header} position="apart">
          <div align='left'>
          <Image maw={60} mx="auto" radius="md" src="logo-1-white.png" alt="logo" />
          </div>
          <Code className={classes.version}>v1.0</Code>
        </Group>
        {links}
      </Navbar.Section>
      
      <Navbar.Section className={classes.footer}>

        <a
          href="#"
          className={classes.link}
          onClick={() => {
            setToken();
            clearToken();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5}/>
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
    
      
    

   
  )
}


export default NavBarSimple;