import React from 'react'
import Skeleton from '@mui/material/Skeleton';


const SkeletonHome = () => {
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "20px"
                }}>
                    <div style={{ marginLeft: '5px' }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={450}
                            height={400} />
                        <Skeleton
                            width="60%" />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />

                    </div>
                    <div style={{ marginLeft: '5px' }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={450}
                            height={400} />
                        <Skeleton
                            width="60%" />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />

                    </div>
                    <div style={{ marginLeft: '5px' }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={450}
                            height={400} />
                        <Skeleton
                            width="60%" />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />

                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <div style={{ marginLeft: '5px' }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={450}
                            height={400} />
                        <Skeleton
                            width="60%" />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                    </div>
                    <div style={{ marginLeft: '5px' }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={450}
                            height={400} />
                        <Skeleton
                            width="60%" />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                    </div>
                    <div style={{ marginLeft: '5px' }}>
                        <Skeleton
                            className='product-card'
                            variant="rectangular"
                            width={450}
                            height={400} />
                        <Skeleton
                            width="60%" />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />
                        <Skeleton
                            width={"80%"} />

                    </div>
                </div>
            </div>
        </>
    )
}



export default SkeletonHome