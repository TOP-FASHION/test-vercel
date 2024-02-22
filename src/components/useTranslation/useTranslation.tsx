import {useTranslation as useTranslationI18Next} from 'next-i18next'

const NS = 'common.generated'

const useTranslation = (keyPrefix: string) => {
  const {t, i18n} = useTranslationI18Next(NS, {keyPrefix})
  const hasTranslation = (key: string) => i18n.exists(`${keyPrefix}.${key}`)

  return {t, hasTranslation}
}

export default useTranslation
