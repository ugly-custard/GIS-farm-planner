**Description:** This Readme file explains all the attributes used in the soil dataset, the database is sourced from <https://www.nature.com/articles/s41597-020-0356-3>. The database compiled data from a set of soil health measurements collected across 41 countries worldwide, including 5,241 data entries from 281 published studies. It includes several soil health indicators and background indicators that describe factors such as climate, elevation, and soil type. Our goal in using this database is to perform comprehensive analyses of soil health changes related to cropland conservation management. Further, we use it for planning and assessing farms based on several factors like climate change, soil type, terrain, depth of soil, elevation, etc.


|**SiteInFor**|Site Information|Detail as possible|
| :- | :- | :- |
|**Country**|Country name||
|**Latitude**|Latitude of site - ° (degree)|° (degree)|
|**Longitude**|Longitude of site - ° (degree)|° (degree)|
|**Elevation**|Elevation of site -  Units: m|Units: m|
|**MAT**|Mean annual air temperature within the study period (1960 - 2017) - °C||
|**MAP**|Mean annual Precipitation within the study period (1960 - 2017) - Units: mm||
|**ClimateType**|study site climate's  type can be obtained from climate koeppon||
|**SamplingDepth**|Difference between bottom and top, e.g, 10-20||
|**SandPerc**|Percentage of Sand||
|**SiltPerc**|Percentage of Silt||
|**ClayPerc**|Percentage of Clay||
|**Texture**|Soil Texture||
|**SoilpH**|Soil pH||
|**CoverCrop**|Cover crop type, some literature calls it catch crop, green manure||
|**CoverGroupCrop**|Cover crops grouped by function or family||
|**GrainCrop**|Grain crop type, also called cash crop||
|**GrainCropGroup**|Grain crops grouped by function or family||
|**Tillage\_C**|Type of tillage for control||
|**Tillage\_T**|type of tillage for cover crop||
|**Fertilization\_C**|Applied fertilization information for control||
|**Fertilization\_T**|Applied fertilization information for cover crop||
|**Conservation\_type**|Including cover crop(CC), No-tillage (NT), Organic farm(OGF), straw mulching, etc||
|**ControlDescription**|Control Description, Winter fallow, Summer fallow, No cover crop||
|**Yield\_C**|Yield of grain(cash) crop from control - Units: kg/hm2||
|**Yield\_T**|Yield of grain(cash) crop from treatment - Units: kg/hm2||
|**Weed\_C**|Weed of Control (Mean value) - Units varied: kg per ha||
|**Weed\_T**|Weed of treatment (Mean value) - Units varied: kg per ha||

The following columns were removed since they had alot of empty entries: 'ClimateType', 'ClayPerc', 'Tillage_C', 'Tillage_T', 'Weed_C', 'Weed_T'
The entries from following columns were removed to make the number of complete rows even among all the entries: Latitude, SiteInfor, GrainCropGroup, Elevation, GrainCrop, CoverCropGroup, CoverCrop, ControlDescription
