/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { title } from 'process';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Quantity } from '../../../components/Quantity';
import { useAppContext } from '../../../contexts/AppContext';
import { UseApi } from '../../../libs/UseApi';
import { useFormatter } from '../../../libs/useFormatter';
import styles from '../../../styles/Product-id.module.css';
import { Product } from '../../../types/Product';
import { Tenant } from '../../../types/Tenant';

const Product = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    useEffect(() => {
        setTenant(data.tenant);
    }, []);

    const [qtCount, setQtCount] = useState (1);
    const formatter = useFormatter();

    const handleUpdateQt = (newCount: number) => {
        setQtCount(newCount);
    }

    const handleAddToCart = () => {

    }
    

    return (
        <div className={styles.container}>
           <Head>
                <title>{data.product.name} | {data.tenant.name}</title>
           </Head>

           <div className={styles.headerArea}>
                <Header
                    color={data.tenant.mainColor}
                    backHref={`/${data.tenant.slug}`}
                    title="Produto"
                    invert
                />
               
            </div>

            <div className={styles.headerBg} style={{backgroundColor: data.tenant.mainColor}}></div>

            <div className={styles.productImage}>
                <img src={data.product.image} alt=""/>
            </div>
            
            <div className= {styles.category}>{data.product.categoryName}</div>
            <div className={styles.title}style={{borderBottomColor: data.tenant.mainColor}}>{data.product.name}</div>
            <div className={styles.line}></div>

            <div className={styles.description}>{data.product.description}</div>

            <div className={styles.qtText}>Quantidade</div>
            <div className={styles.area}>
                <div className={styles.areaLeft}>
                    <Quantity
                        color={data.tenant.mainColor}
                        count={qtCount}
                        onUpdateCount={handleUpdateQt}
                        min={1}
                    />
                </div>
                <div 
                    className={styles.areaRight}
                    style={{color: data.tenant.mainColor}}
                    >{formatter.formatPrice(data.product.price)}
                </div>
            </div>

            <div className={styles.buttonArea}>
                <Button
                    color={data.tenant.mainColor}
                    label= "Adicionar ao carrinho"
                    onClick={handleAddToCart}
                    fill
                />
            </div>
        </div>
         
    );
    
}

export default Product;

type Props = {
    tenant: Tenant
    product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    
    const api = UseApi(tenantSlug as string);

    //Get Tenant/ Comando responssável por pegar o tenant.
    const tenant = await api.getTenant();
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } }
    }
    //Get Products/ Comando responssável para pegar um produto.
    const product = await api.getProduct(id as string);

    return {
        props: {
            tenant,
            product
        }
    }

}