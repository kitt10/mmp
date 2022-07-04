import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'


const componentS = (style: StyleI) => css({
    width: '100%',
    height: style.view.headerHeight,
    zIndex: 200,
    backgroundColor: style.colors.dark,
    color: style.colors.blond,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
})

const Table: React.FunctionComponent = props => {

    const { style } = useMainContext()

    return (
        <div css={componentS(style)}>
            table
        </div>
    )
}

export default Table