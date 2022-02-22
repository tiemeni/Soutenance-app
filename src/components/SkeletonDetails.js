import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const SkeletonDetails = () => {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: "row",
                    marginTop: "50px"
                }}>
                    <div style={{ marginLeft: "130px" }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={500} />
                    </div>
                    <div>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={500} />
                    </div>
                    <div style={{ marginLeft: "80px" }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={100} />
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={150}
                            style={{ marginTop: '50px' }} />
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={75}
                            style={{ marginTop: '50px' }} />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: "row",
                    marginTop: "-30px"
                }}>
                    <div style={{ marginLeft: "130px" }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={500} />
                    </div>
                    <div>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={500} />
                    </div>
                    <div style={{ marginLeft: "80px" }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={200} />
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={400}
                            height={75}
                            style={{ marginTop: '50px' }} />
                    </div>
                </div>
            </div>
        </>
    )
}


export default SkeletonDetails