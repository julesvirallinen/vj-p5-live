import React, { useEffect, useRef } from 'react';
import { Maptastic } from 'maptastic';
import styled from 'styled-components';

import { useSettings } from '~/hooks/useSettings';

export interface IMappableProps {
  id: string;
  children: React.ReactNode;
}

const CanvasMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
`;

export const Mappable: React.FC<IMappableProps> = ({
  children,
  id,
  ...restProps
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { maptasticEnabled } = useSettings();

  useEffect(() => {
    if (maptasticEnabled && mapRef.current) {
      new Maptastic(id);
    }
  }, [maptasticEnabled, id]);

  return (
    <CanvasMapContainer id={id} ref={mapRef} {...restProps}>
      {children}
    </CanvasMapContainer>
  );
};

/**
 * To use the maptastic useChangedLayout, something like this works
 * 
 *   const [mapper] = useState(
    new Maptastic({
      onchange: () => {
        // icky feeling self referential
        setMapperLayout(mapper.getLayout()); // <- save mapper layout, allow saving layouts as named stuff :)
      },
    })
  );
  Logger.debug(mapperLayout);
 * 
* Probably should save the maptastic object to the app state, where it can be referenced (add maps etc)
 * 
 */
