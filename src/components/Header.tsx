import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

interface LinkProps {
  name: string
  url: string
}

type HeaderProps = {
  title: string
  links?: LinkProps[]
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title, links = [] } = props

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
        {links.map((link, index) => (
          <Button color="inherit" component={Link} to={link.url} key={index}>
            {link.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default Header
