import { React,useEffect, useState } from 'react';
import { CButton, CPopover, CForm, CFormTextarea,CCol } from '@coreui/react'
import axios from 'axios';
const token  = import.meta.env.VITE_APP_TOKEN


// The Main component receives props passed from the Laravel controller
const DescricaoComp = ({ title, text }) => {

  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API;
  const path = 'funcionalidade/03/atila.png';
  const [pathimg,setPathimg] = useState(null)
  const [desc,setDesc] = useState(null)
 // const html = `<div><img className="img-fluid" src="/assets/img/${pathimg}" style="width:300px" /></div>`;

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };

  const PopoverLiveExample = () => {
     const customPopoverStyle = {
    '--cui-popover-max-width': '550px !important',
    '--cui-popover-border-color': 'var(--cui-primary)',
    '--cui-popover-header-bg': 'var(--cui-primary)',
    '--cui-popover-header-color': 'var(--cui-white)',
    '--cui-popover-body-padding-x': '1rem',
    '--cui-popover-body-padding-y': '.5rem',
    }
    const html = `<div><img className="img-fluid" src="${imagem + pathimg}" style="width:100%;height:auto;" /></div>`;
    return (
        <>
        <CCol md={7}>
            <CForm>
                <CFormTextarea
                    id="exampleFormControlTextarea1"
                    label="Onde é Aplicado no Sistema"
                    rows={3}
                    value={desc}
                    text="Must be 8-20 words long."
                    readOnly
                />
            </CForm>
        </CCol>
        <CCol md={2}>
            <CPopover
                title={title}
                content={<div style={{ width: '550px', maxWidth: '90vw' }} dangerouslySetInnerHTML={{ __html: html }} />}
                // content="And here’s some amazing content. It’s very engaging. Right?"
                placement="bottom"
                style={customPopoverStyle}
            >
            <CButton color="danger">
                Onde Encontrar
            </CButton>
        </CPopover>
        </CCol>
      </>
    )
  }

  useEffect(() => {
      axios.get(`${endpoint}/funcionalidade?filtro=${encodeURIComponent(text)}`, config)
        .then((result) => {
          setPathimg(result.data.data.fun_link)
          setDesc(result.data.data.fun_descricao)
        });
  },[text])

  return (
      <PopoverLiveExample/>
  )
}
export default DescricaoComp
