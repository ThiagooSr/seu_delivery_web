import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import styles from '../../styles/Forget.module.css';
import { Tenant } from '../../types/Tenant';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { UseApi } from '../../libs/UseApi';
import Link from 'next/link';
import { useRouter } from 'next/router';


const Forget = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    useEffect(() => {
        setTenant(data.tenant);


    }, []);

    const router = useRouter();

    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/forget-sucess`);
    }  

    return (
        <div className={styles.container}>
            <Head>
                <title>Esqueci a senha</title>
            </Head>

            <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} />

            <div className={styles.header}>{data.tenant.name}</div>

            <div className={styles.title}>Esqueceu sua senha?</div>

            <div
                className={styles.subtitle}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir a sua senha.</div>

            <div className={styles.line}></div>

            <div className={styles.formArea}>
                <div className={styles.inputArea}>
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={setEmail}
                    />
                </div>
                <div className={styles.inputArea}>
                    <Button

                        color={data.tenant.mainColor}
                        label="Enviar"
                        onClick={handleSubmit}
                        fill
                    />

                </div>
            </div>

        </div>
    );
}

export default Forget;

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