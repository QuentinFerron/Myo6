// do a classic Header component

import Head from "next/head";

export default function Header() {

    return ( 

        <Head>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>

            <title>Myo6</title>

            <link rel="icon" href="/assets/images/logo.png" />

            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        </Head>
    
    )

}
