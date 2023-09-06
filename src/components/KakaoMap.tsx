import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

type DataType = {
  latitude: number
  longitude: number
}

interface KakaoMapProps {
  data: DataType
  onChange: (data: DataType) => void
  detailPage?: boolean
}

const KakaoMap = ({ data, onChange, detailPage = false }: KakaoMapProps) => {
  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) return
    const newData = {
      latitude: mouseEvent.latLng.getLat(),
      longitude: mouseEvent.latLng.getLng(),
    }

    onChange(newData)
  }

  return (
    <Map
      center={{ lat: data.latitude, lng: data.longitude }}
      style={{ width: '100%', height: '360px' }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker
        position={{ lat: data.latitude, lng: data.longitude }}
      ></MapMarker>
    </Map>
  )
}

export default KakaoMap
