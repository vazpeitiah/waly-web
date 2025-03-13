import { useTranslation } from 'react-i18next'

interface HeaderProps {
  header: string
}

const Header = ({ header }: HeaderProps) => {
  const { t, i18n } = useTranslation()
  return <>{i18n.exists(header) ? t(header) : header}</>
}

export default Header
