import Head from 'next/head';
import LandlordReportForm from '../components/LandlordReportForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Landlord Update Report Generator</title>
        <meta name="description" content="Automated biweekly landlord reports with AI market insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
      <LandlordReportForm />
    </>
  );
}
