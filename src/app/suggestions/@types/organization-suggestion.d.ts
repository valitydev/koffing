interface OgranizationSuggestionAddressBody {
    postal_code: StringOrNull;
    country: StringOrNull;
    region_fias_id: StringOrNull;
    region_kladr_id: StringOrNull;
    region_with_type: StringOrNull;
    region_type: StringOrNull;
    region_type_full: StringOrNull;
    region: StringOrNull;
    area_fias_id: StringOrNull;
    area_kladr_id: StringOrNull;
    area_with_type: StringOrNull;
    area_type: StringOrNull;
    area_type_full: StringOrNull;
    area: StringOrNull;
    city_fias_id: StringOrNull;
    city_kladr_id: StringOrNull;
    city_with_type: StringOrNull;
    city_type: StringOrNull;
    city_type_full: StringOrNull;
    city: StringOrNull;
    city_area: StringOrNull;
    city_district_fias_id: StringOrNull;
    city_district_kladr_id: StringOrNull;
    city_district_with_type: StringOrNull;
    city_district_type: StringOrNull;
    city_district_type_full: StringOrNull;
    city_district: StringOrNull;
    settlement_fias_id: StringOrNull;
    settlement_kladr_id: StringOrNull;
    settlement_with_type: StringOrNull;
    settlement_type: StringOrNull;
    settlement_type_full: StringOrNull;
    settlement: StringOrNull;
    street_fias_id: StringOrNull;
    street_kladr_id: StringOrNull;
    street_with_type: StringOrNull;
    street_type: StringOrNull;
    street_type_full: StringOrNull;
    street: StringOrNull;
    house_fias_id: StringOrNull;
    house_kladr_id: StringOrNull;
    house_type: StringOrNull;
    house_type_full: StringOrNull;
    house: StringOrNull;
    block_type: StringOrNull;
    block_type_full: StringOrNull;
    block: StringOrNull;
    flat_type: StringOrNull;
    flat_type_full: StringOrNull;
    flat: StringOrNull;
    flat_area: StringOrNull;
    square_meter_price: StringOrNull;
    flat_price: StringOrNull;
    postal_box: StringOrNull;
    fias_id: StringOrNull;
    fias_level: StringOrNull;
    kladr_id: StringOrNull;
    capital_marker: StringOrNull;
    okato: StringOrNull;
    oktmo: StringOrNull;
    tax_office: StringOrNull;
    tax_office_legal: StringOrNull;
    timezone: StringOrNull;
    geo_lat: StringOrNull;
    geo_lon: StringOrNull;
    beltway_hit: StringOrNull;
    beltway_distance: StringOrNull;
    qc_geo: StringOrNull;
    qc_complete: StringOrNull;
    qc_house: StringOrNull;
    unparsed_parts: StringOrNull;
    qc: StringOrNull;
}

interface OgranizationSuggestionAddress {
    unrestricted_value: StringOrNull;
    value: StringOrNull;
    data: OgranizationSuggestionAddressBody | null
}

interface OgranizationSuggestionState {
    actuality_date: NumberOrNull;
    liquidation_date: NumberOrNull;
    registration_date: NumberOrNull;
    status: StringOrNull;
}

interface OgranizationSuggestionName {
    full_with_opf: StringOrNull;
    short_with_opf: StringOrNull;
    latin: StringOrNull;
    full: StringOrNull;
    short: StringOrNull;
}

interface OgranizationSuggestionOpf {
    full: StringOrNull;
    short: StringOrNull;
    code: StringOrNull;
}

interface OgranizationSuggestionManagement {
    name: StringOrNull;
    post: StringOrNull;
}

interface OgranizationSuggestionBody {
    kpp: StringOrNull;
    branch_type: StringOrNull;
    branch_count: NumberOrNull;
    type: StringOrNull;
    inn: StringOrNull;
    ogrn: StringOrNull;
    okpo: StringOrNull;
    okved: StringOrNull;
    management: OgranizationSuggestionManagement | null;
    opf: OgranizationSuggestionOpf | null;
    name: OgranizationSuggestionName | null;
    state: OgranizationSuggestionState | null;
    address: OgranizationSuggestionAddress | null;
}

interface OgranizationSuggestion {
    unrestricted_value: StringOrNull;
    value: StringOrNull;
    data: OgranizationSuggestionBody | null;
}