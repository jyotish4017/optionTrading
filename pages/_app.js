import { ThemeProvider } from 'next-themes';
// import '../styles/pink-theme.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider 
      attribute="class"
    themes={['pink', 'red', 'blue', 'light', 'dark']}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp