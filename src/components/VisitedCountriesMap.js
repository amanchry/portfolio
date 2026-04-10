'use client';

import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import worldGeo from '@/data/world_countries.json';
import { HOME_COUNTRY_NAME, VISITED_COUNTRY_NAMES } from '@/data/visitedCountries';

const FILL_HOME = '#0d9488';
const FILL_VISITED = '#ed921a';
const FILL_OTHER = '#e5e7eb';
const STROKE = '#475569';

function normName(s) {
  return String(s || '')
    .trim()
    .toLowerCase();
}

function nameMatchesAnyProperty(feature, nameLower) {
  const p = feature.properties || {};
  const candidates = [p.NAME, p.NAME_LONG, p.ADMIN, p.BRK_NAME, p.NAME_SORT, p.name];
  for (const c of candidates) {
    if (c != null && normName(c) === nameLower) return true;
  }
  return false;
}

function isHomeCountry(feature, homeNameLower) {
  return nameMatchesAnyProperty(feature, homeNameLower);
}

function isVisitedCountry(feature, visitedLowerSet) {
  const p = feature.properties || {};
  const candidates = [p.NAME, p.NAME_LONG, p.ADMIN, p.BRK_NAME, p.NAME_SORT, p.name];
  for (const c of candidates) {
    if (c != null && visitedLowerSet.has(normName(c))) return true;
  }
  return false;
}

function countryMapCategory(feature, homeNameLower, visitedLowerSet) {
  if (isHomeCountry(feature, homeNameLower)) return 'home';
  if (isVisitedCountry(feature, visitedLowerSet)) return 'visited';
  return 'other';
}

function geographyLabel(feature) {
  const p = feature.properties || {};
  return p.NAME || p.name || p.NAME_LONG || 'Unknown';
}

const MAP_HEIGHT_PX = 440;

export default function VisitedCountriesMap() {
  const containerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [ready, setReady] = useState(false);

  const homeNameLower = useMemo(() => normName(HOME_COUNTRY_NAME), []);
  const visitedLowerSet = useMemo(
    () => new Set(VISITED_COUNTRY_NAMES.map((n) => normName(n))),
    []
  );

  const geo =
    worldGeo && worldGeo.type === 'FeatureCollection' && Array.isArray(worldGeo.features)
      ? worldGeo
      : null;

  const getStyle = useCallback(
    (feature) => {
      const cat = countryMapCategory(feature, homeNameLower, visitedLowerSet);
      const fillColor = cat === 'home' ? FILL_HOME : cat === 'visited' ? FILL_VISITED : FILL_OTHER;
      return {
        fillColor,
        fillOpacity: 0.65,
        color: STROKE,
        weight: 1,
      };
    },
    [homeNameLower, visitedLowerSet]
  );

  useEffect(() => {
    if (!geo || !containerRef.current || mapInstanceRef.current) return;

    const map = L.map(containerRef.current, {
      center: [14, 10],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      worldCopyJump: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const geoLayer = L.geoJSON(geo, {
      style: getStyle,
      onEachFeature: (feature, layer) => {
        const name = geographyLabel(feature);
        const cat = countryMapCategory(feature, homeNameLower, visitedLowerSet);
        layer.bindTooltip( name, {
          sticky: true,
          direction: 'auto',
          className: 'visited-map-tooltip',
        });
        layer.on({
          mouseover: (e) => {
            const lyr = e.target;
            lyr.setStyle({
              fillOpacity: 0.9,
              weight: 2,
              color: '#0f172a',
            });
            if (!L.Browser.ie && !L.Browser.opera) {
              lyr.bringToFront();
            }
          },
          mouseout: (e) => {
            geoLayer.resetStyle(e.target);
          },
        });
      },
    }).addTo(map);

    try {
      const b = geoLayer.getBounds();
      if (b.isValid()) {
        map.fitBounds(b, { padding: [28, 28], maxZoom: 5 });
      }
    } catch (_) {
      map.setView([24, 10], 2);
    }

    mapInstanceRef.current = map;
    setReady(true);

    const t = requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      cancelAnimationFrame(t);
      map.remove();
      mapInstanceRef.current = null;
      setReady(false);
    };
  }, [geo, getStyle, homeNameLower, visitedLowerSet]);

  if (!geo) {
    return (
      <p className="text-center text-muted" style={{ padding: '2rem' }}>
        Map data is missing or invalid.
      </p>
    );
  }

  return (
    <div className="visited-countries-map">
      <div
        className="visited-countries-map__surface leaflet-map-shell"
        style={{
          width: '100%',
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div
          ref={containerRef}
          className="visited-countries-map__leaflet-root"
          style={{
            height: MAP_HEIGHT_PX,
            width: '100%',
            background: '#e2e8f0',
          }}
          role="application"
          aria-label="World map of countries visited"
        />
        {!ready && (
          <div
            className="visited-countries-map__leaflet-loading"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              fontSize: 14,
              color: '#64748b',
              background: 'rgba(248,250,252,0.85)',
            }}
          >
            Loading map…
          </div>
        )}
      </div>


      <div
        className="visited-countries-map__hint m-t15"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px 20px',
          fontSize: 13,
          color: '#64748b',
          lineHeight: 1.4,
        }}
      >
        <span>
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: 2,
              background: FILL_HOME,
              marginRight: 6,
              verticalAlign: 'middle',
            }}
          />
          Home country
        </span>
        <span>
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: 2,
              background: FILL_VISITED,
              marginRight: 6,
              verticalAlign: 'middle',
            }}
          />
         Visited Countries
        </span>
        {/* <span>
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: 2,
              background: FILL_OTHER,
              marginRight: 6,
              verticalAlign: 'middle',
              border: '1px solid #cbd5e1',
            }}
          />
          Other
        </span> */}
 
      </div>
    </div>
  );
}
