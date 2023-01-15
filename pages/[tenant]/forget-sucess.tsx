import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import styles from '../../styles/ForgetSucess.module.css';
import { Tenant } from '../../types/Tenant';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { UseApi } from '../../libs/UseApi';
import { useRouter } from 'next/router';
import { Icon } from '../../components/icon';


const ForgetSucess = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    useEffect(() => {
        setTenant(data.tenant);


    }, []);

    const router = useRouter();

    const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/login`);
    }  

    return (
        <div className={styles.container}>
            <Head>
                <title>Esqueci a senha</title>
            </Head>

            <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/forget`} />

            <div className={styles.iconArea}>
                <Icon icon='mailSent' color={data.tenant.mainColor} width={99} height={81}/>
            </div>
            <div className={styles.title}>Verifique seu e-mail</div>

            <div
                className={styles.subtitle}
            >Enviamos as instruções para recuperação de senha para o seu e-mail.</div>

            <div className={styles.formArea}>
                <div className={styles.inputArea}>
                    <Button

                        color={data.tenant.mainColor}
                        label="Fazer login"
                        onClick={handleSubmit}
                        fill
                    />

                </div>
            </div>

        </div>
    );
}

export default ForgetSucess;

type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;

    const api = UseApi(tenantSlug as string);

    //Get Tenant
    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } }
    }
    //Get Products
    const products = await api.getAllProducts();

    return {
        props: {
            tenant,
            products
        }
    }

}