const fs = require('fs');

const questionsData = {
  // Topic 1: Pilot Qualifications & Documents (ACS Area I. Task A) - 22 questions
  pilotQualifications: {
    name: 'Pilot Qualifications & Documents',
    questions: [
      {
        q: 'What three documents must a private pilot have in their physical possession or readily accessible in the aircraft when acting as PIC? (14 CFR 61.3)',
        a: '1) An authentic pilot certificate, 2) A government-issued photo identification (e.g. driver license or passport), and 3) A valid FAA medical certificate or BasicMed qualification documents.'
      },
      {
        q: 'How long is a Third-Class Medical Certificate valid for a pilot who is 38 years old on the date of examination? (14 CFR 61.23)',
        a: '60 calendar months (5 years), expiring on the last day of the 60th month after the month of the examination date.'
      },
      {
        q: 'How long is a Third-Class Medical Certificate valid for a pilot who is 40 years of age or older on the date of examination? (14 CFR 61.23)',
        a: '24 calendar months (2 years), expiring on the last day of the 24th month after the examination.'
      },
      {
        q: 'What are the privileges and limitations of a First-Class Medical held by a private pilot under age 40 exercising private pilot privileges?',
        a: 'Although First-Class ATP privileges expire after 12 calendar months, the certificate remains valid for private pilot privileges for the full 60 calendar months.'
      },
      {
        q: 'What are the requirements to fly under BasicMed (14 CFR Part 68)?',
        a: '1) Hold a valid U.S. driver license, 2) Have held an FAA medical certificate after July 14, 2006, 3) Complete the Comprehensive Medical Examination Checklist (CMEC) with a state-licensed physician every 48 months, and 4) Complete an online medical education course every 24 calendar months.'
      },
      {
        q: 'What aircraft and operational limitations apply when flying under BasicMed?',
        a: 'Aircraft: Max certified takeoff weight ≤ 6,000 lbs, max 6 occupants (5 passengers + pilot). Flight: Below 18,000 ft MSL, max airspeed 250 KIAS, within the U.S. (unless authorized by another nation), and not for compensation or hire.'
      },
      {
        q: 'What is required to maintain flight review currency as a Private Pilot? (14 CFR 61.56)',
        a: 'A flight review must be satisfactorily completed within the preceding 24 calendar months with an authorized instructor, consisting of at least 1 hour of ground training and 1 hour of flight training, and receive a logbook endorsement.'
      },
      {
        q: 'What recency of experience is required to carry passengers during daylight hours? (14 CFR 61.57(a))',
        a: 'Within the preceding 90 days, the pilot must have made at least 3 takeoffs and 3 landings as the sole manipulator of the flight controls in the same category, class, and type (if a type rating is required). In a tailwheel airplane, landings must be to a full stop.'
      },
      {
        q: 'What recency of experience is required to carry passengers at night? (14 CFR 61.57(b))',
        a: 'Within the preceding 90 days, during the period beginning 1 hour after sunset and ending 1 hour before sunrise, at least 3 takeoffs and 3 landings to a full stop in the same category, class, and type.'
      },
      {
        q: 'Can a private pilot pay less than the pro-rata share of operating expenses when carrying passengers? (14 CFR 61.113(c))',
        a: 'No. A private pilot may not pay less than the pro-rata (equal) share of the operating expenses of a flight involving only fuel, oil, airport expenditures, or rental fees, unless an exception (e.g. search and rescue or incidental business) applies.'
      },
      {
        q: 'Can a private pilot fly for a business meeting and receive travel expense reimbursement?',
        a: 'Yes, provided the flight is only incidental to that business or employment and the aircraft does not carry passengers or property for compensation or hire.'
      },
      {
        q: 'What definition defines "high-performance airplane" and what endorsement is required? (14 CFR 61.31(f))',
        a: 'An airplane with an engine of more than 200 horsepower. Requires ground and flight training from an authorized instructor and a one-time logbook endorsement.'
      },
      {
        q: 'What is a "complex airplane" and what is required to act as PIC? (14 CFR 61.31(e))',
        a: 'An airplane having retractable landing gear, flaps, and a controllable pitch propeller (or turbine-powered). Requires ground/flight training and a one-time logbook endorsement.'
      },
      {
        q: 'What endorsement is required to act as PIC of a tailwheel airplane? (14 CFR 61.31(i))',
        a: 'Flight training and a logbook endorsement certifying proficiency in normal/crosswind takeoffs and landings, wheel landings, and go-arounds.'
      },
      {
        q: 'What is the difference between "current" and "proficient"?',
        a: '"Current" means having met the minimum legal FAA regulatory requirements. "Proficient" means having the skill, knowledge, and confidence to conduct the flight with maximum safety and competence.'
      },
      {
        q: 'How does a change of permanent mailing address affect pilot certificate privileges? (14 CFR 61.60)',
        a: 'The pilot must notify the FAA Airman Certification Branch in writing within 30 days of moving; otherwise, certificate privileges cannot be exercised.'
      },
      {
        q: 'What flights are required to be logged in a pilot logbook? (14 CFR 61.51)',
        a: 'Only flights used to meet the requirements for a certificate, rating, flight review, or recent flight experience (currency) are legally required to be logged.'
      },
      {
        q: 'Can a student pilot carry passengers or fly in furtherance of a business?',
        a: 'No. Student pilots are strictly prohibited from carrying passengers and from flying in furtherance of a business or for compensation or hire.'
      },
      {
        q: 'What endorsements must a student pilot have to fly solo cross-country?',
        a: 'Solo cross-country endorsement from the student’s instructor on the student pilot certificate/logbook, plus an endorsement for the specific route and cross-country flight planning review.'
      },
      {
        q: 'When can a pilot log PIC time when not the sole occupant? (14 CFR 61.51(e))',
        a: 'A private pilot may log PIC time for any flight time during which they are the sole manipulator of the controls of an aircraft for which they are rated.'
      },
      {
        q: 'What is a Statement of Demonstrated Ability (SODA)?',
        a: 'An FAA waiver granted to a pilot with a static physical defect (e.g. loss of vision in one eye) after demonstrating the ability to safely fly to an FAA examiner.'
      },
      {
        q: 'When is a Special Flight Permit (Ferry Permit) required and how is it obtained? (14 CFR 21.197)',
        a: 'When an aircraft is not currently airworthy but capable of safe flight (e.g. flying to a repair base). It is obtained from the local FAA Flight Standards District Office (FSDO) or Designated Airworthiness Representative (DAR).'
      }
    ]
  },

  // Topic 2: Airworthiness Requirements & Equipment (ACS Area I. Task B) - 22 questions
  airworthiness: {
    name: 'Airworthiness & Required Equipment',
    questions: [
      {
        q: 'What documents must be on board the aircraft prior to flight? (ARROW)',
        a: 'A - Airworthiness Certificate, R - Registration Certificate (federal & state if required), R - Radio Station License (international only), O - Operating Limitations (POH, placards, instrument markings), W - Weight and Balance data (official FAA approved).'
      },
      {
        q: 'How long does an aircraft Airworthiness Certificate remain valid?',
        a: 'As long as the aircraft is maintained in accordance with applicable Federal Aviation Regulations and registered in the United States.'
      },
      {
        q: 'What are the required aircraft inspections for VFR flight? (AAVIATE)',
        a: 'A - Annual inspection (12 calendar months), A - Airworthiness Directives (ADs complied with), V - VOR check (30 days for IFR), I - 100-hour inspection (if used for hire or flight instruction), A - Altimeter/pitot-static (24 calendar months for IFR), T - Transponder (24 calendar months), E - ELT inspection (12 calendar months).'
      },
      {
        q: 'Who is primarily responsible for maintaining an aircraft in an airworthy condition? (14 CFR 91.403)',
        a: 'The owner or operator of the aircraft.'
      },
      {
        q: 'Who is directly responsible for determining whether an aircraft is in safe condition for flight? (14 CFR 91.7)',
        a: 'The Pilot in Command (PIC). The PIC must discontinue the flight when unairworthy mechanical, electrical, or structural conditions occur.'
      },
      {
        q: 'What is an Airworthiness Directive (AD) and are they mandatory? (14 CFR Part 39)',
        a: 'An AD is a legally enforceable rule issued by the FAA to correct an unsafe condition in an aircraft, engine, propeller, or appliance. Compliance is mandatory.'
      },
      {
        q: 'What are the three types of Airworthiness Directives?',
        a: '1) Notice of Proposed Rulemaking (NPRM) standard ADs, 2) Emergency ADs (immediate compliance required before flight), and 3) One-time vs. Recurring ADs.'
      },
      {
        q: 'What is required for Day VFR flight equipment under 14 CFR 91.205(b)? (ATOMATOFLAMES)',
        a: 'A - Airspeed indicator, T - Tachometer (each engine), O - Oil pressure gauge, M - Manifold pressure gauge (altitude engine), A - Altimeter, T - Temperature gauge (liquid cooled), O - Oil temperature gauge, F - Fuel gauge (each tank), L - Landing gear position indicator, A - Anti-collision lights (certified after 1996), M - Magnetic compass, E - ELT, S - Safety belts / shoulder harnesses.'
      },
      {
        q: 'What additional equipment is required for Night VFR flight under 14 CFR 91.205(c)? (FLAPS)',
        a: 'F - Fuses (one complete spare set or circuit breakers), L - Landing light (if operated for hire), A - Anti-collision light system, P - Position lights (navigation lights: red left, green right, white tail), S - Source of electrical energy (battery/alternator).'
      },
      {
        q: 'What is the step-by-step process for flying with inoperative equipment without an MEL? (14 CFR 91.213(d))',
        a: 'Check if item is required by: 1) VFR-day type certificate, 2) Kinds of Operations Equipment List (KOEL), 3) 14 CFR 91.205, 4) Any Airworthiness Directives (ADs). If not required, deactivate/remove it, placard it "INOPERATIVE", and PIC determines flight is safe.'
      },
      {
        q: 'What is a Minimum Equipment List (MEL)?',
        a: 'An FAA-approved, aircraft-specific list that allows the aircraft to be operated with specific inoperative equipment under clear conditions and limitations.'
      },
      {
        q: 'When must an Emergency Locator Transmitter (ELT) battery be replaced or recharged? (14 CFR 91.207)',
        a: 'When the transmitter has been in use for more than 1 cumulative hour, or when 50 percent of its useful battery life (or charge) has expired as stamped on the battery.'
      },
      {
        q: 'When can an ELT be tested and how?',
        a: 'Only during the first 5 minutes after the top of the hour, for no more than 3 audio sweeps on 121.5 MHz.'
      },
      {
        q: 'Can an aircraft exceed the 100-hour inspection interval? (14 CFR 91.409(b))',
        a: 'Yes, by no more than 10 hours, exclusively while en route to reach a place where the inspection can be performed. The excess time is deducted from the next 100-hour inspection interval.'
      },
      {
        q: 'Can an annual inspection take the place of a 100-hour inspection?',
        a: 'Yes, an annual inspection can substitute for a 100-hour inspection, but a 100-hour inspection cannot substitute for an annual.'
      },
      {
        q: 'Who can perform and sign off an Annual Inspection vs. a 100-Hour Inspection?',
        a: 'An Annual Inspection must be performed and approved by an A&P mechanic with Inspection Authorization (IA). A 100-hour inspection can be signed off by any licensed A&P mechanic.'
      },
      {
        q: 'What is Preventive Maintenance and who is authorized to perform it? (14 CFR 43.3 & Appendix A)',
        a: 'Simple or minor preservation operations and the replacement of small standard parts (e.g. changing oil, replacing spark plugs, inflating tires). A licensed pilot owning or operating the aircraft may perform and log it.'
      },
      {
        q: 'What entry must be made in the aircraft maintenance logbook after completing preventive maintenance? (14 CFR 43.9)',
        a: '1) Description of work performed, 2) Date of completion, 3) Pilot’s name, signature, certificate number, and type of certificate held.'
      },
      {
        q: 'What is a Supplemental Type Certificate (STC)?',
        a: 'An FAA approval authorizing a major change in the type design of an aircraft, engine, or propeller (e.g. adding vortex generators or engine upgrades).'
      },
      {
        q: 'What is the difference between a Form 337 and a standard maintenance logbook entry?',
        a: 'FAA Form 337 is used to record and document major repairs and major alterations, submitted to the FAA, while standard logbook entries record minor maintenance and inspections.'
      },
      {
        q: 'How often must an aircraft transponder be tested and inspected for operations in controlled airspace? (14 CFR 91.413)',
        a: 'Every 24 calendar months.'
      },
      {
        q: 'What is a Kinds of Operations Equipment List (KOEL)?',
        a: 'A list in the POH Section 2 that identifies the systems and equipment required for flight under Day VFR, Night VFR, Day IFR, Night IFR, or icing conditions.'
      }
    ]
  },

  // Topic 3: Weather Information & Meteorology (ACS Area I. Task C) - 26 questions
  weather: {
    name: 'Weather Information & Meteorology',
    questions: [
      {
        q: 'What are the three essential ingredients for thunderstorm development?',
        a: '1) Sufficient moisture, 2) An unstable atmosphere (unstable lapse rate), and 3) A lifting action (surface heating, frontal slope, or orographic lift).'
      },
      {
        q: 'What are the three stages of a thunderstorm’s life cycle?',
        a: '1) Cumulus stage (continuous updrafts), 2) Mature stage (precipitation begins at surface, updrafts and downdrafts create maximum turbulence), 3) Dissipating stage (downdrafts predominate).'
      },
      {
        q: 'What is a microburst, what are its hazards, and how long does it typically last?',
        a: 'A concentrated, severe downdraft producing damaging winds near the ground. Hazardous due to wind shear (up to 6,000 fpm downdrafts and 45-knot headwind-to-tailwind shear). Peak intensity lasts ~5 to 15 minutes.'
      },
      {
        q: 'How far should aircraft stay clear of severe thunderstorms in flight? (FAA AIM recommendation)',
        a: 'At least 20 nautical miles from severe thunderstorms or radar echoes displaying severe intensity.'
      },
      {
        q: 'What are the standard temperature and atmospheric pressure at sea level in international standard atmosphere (ISA)?',
        a: '15°C (59°F) and 29.92 inches of mercury (1013.25 hectopascals / millibars).'
      },
      {
        q: 'What is the standard atmospheric lapse rate for temperature and pressure with altitude?',
        a: 'Temperature decreases approximately 2°C (3.5°F) per 1,000 feet; pressure decreases approximately 1 inch of mercury per 1,000 feet of altitude.'
      },
      {
        q: 'What is Radiation Fog and under what conditions does it form?',
        a: 'Forms on clear, calm nights with high relative humidity as terrestrial radiation cools the ground and the air immediately above it to its dew point.'
      },
      {
        q: 'What is Advection Fog and where is it commonly found?',
        a: 'Forms when warm, moist air moves over a colder land or water surface (common in coastal areas with onshore winds).'
      },
      {
        q: 'What is Upslope Fog?',
        a: 'Forms when moist, stable air is forced upward along sloping terrain, adiabatically cooling to its saturation dew point.'
      },
      {
        q: 'What causes Steam Fog (Sea Smoke)?',
        a: 'Forms when cold, dry air moves across warm water; evaporating water immediately condenses into rising vapor plumes.'
      },
      {
        q: 'What are the characteristics of a Cold Front vs. a Warm Front?',
        a: 'Cold front: Fast-moving, steep slope, pushes warm air up abruptly causing narrow band of cumuliform clouds, turbulence, and showery rain. Warm front: Slow-moving, gentle slope, wide area of stratiform clouds, steady precipitation, and poor visibility.'
      },
      {
        q: 'What is an Occluded Front and what weather does it produce?',
        a: 'Forms when a fast-moving cold front overtakes a warm front, lifting the warm air mass entirely aloft; produces complex weather combining cold and warm front characteristics.'
      },
      {
        q: 'What are the three main types of structural icing and their characteristics?',
        a: '1) Clear ice: Heavy, hard, glossy, formed from large supercooled water droplets freezing slowly. 2) Rime ice: Rough, milky, opaque, formed from small droplets freezing instantly. 3) Mixed ice: Combination of clear and rime.'
      },
      {
        q: 'How does frost on the wings affect aircraft performance?',
        a: 'Frost disrupts smooth airflow over the wing, decreasing lift by up to 30% and increasing drag by up to 40%, drastically increasing stall speed.'
      },
      {
        q: 'What is the difference between a METAR and a SPECI?',
        a: 'A METAR is a standard scheduled routine surface weather observation (hourly), while a SPECI is an unscheduled special observation issued when critical weather criteria change significantly.'
      },
      {
        q: 'In a METAR, decode: "OVC015 2 1/2SM -RA BR".',
        a: 'Sky condition: Overcast at 1,500 feet AGL; Visibility: 2 and 1/2 statute miles; Weather: Light rain (-RA) and mist (BR).'
      },
      {
        q: 'What is a Terminal Aerodrome Forecast (TAF) and what area and time does it cover?',
        a: 'An airport weather forecast for a 5-statute-mile radius from the center of the airport runway complex, valid for a 24- or 30-hour period, updated 4 times daily.'
      },
      {
        q: 'What are the three types of AIRMETs and what hazard does each describe?',
        a: '1) AIRMET Sierra: IFR conditions and extensive mountain obscuration. 2) AIRMET Tango: Moderate turbulence, sustained surface winds ≥30 knots, and non-convective low-level wind shear. 3) AIRMET Zulu: Moderate icing and freezing level data.'
      },
      {
        q: 'What is a SIGMET (WS) and what phenomena does it warn against?',
        a: 'Advisories of non-convective weather hazardous to all aircraft: severe icing, severe/extreme turbulence, clear air turbulence (CAT), widespread dust/sandstorms, and volcanic ash.'
      },
      {
        q: 'What criteria trigger the issuance of a Convective SIGMET (WST)?',
        a: '1) Severe thunderstorms with surface winds ≥50 knots, 2) Hail at the surface ≥ 3/4 inch in diameter, 3) Tornadoes, 4) Embedded thunderstorms, 5) Lines of thunderstorms (squall lines), 6) Active convective areas producing heavy precipitation.'
      },
      {
        q: 'What is Low-Level Wind Shear (LLWS) and when is it most hazardous?',
        a: 'A sudden change in wind direction and/or speed over a short distance at low altitudes. Hazardous during takeoff, climbout, approach, and landing due to abrupt airspeed and lift changes.'
      },
      {
        q: 'What is the definition of a "ceiling" in aviation weather?',
        a: 'The height above the earth’s surface of the lowest broken (BKN 5/8 to 7/8) or overcast (OVC 8/8) layer, or vertical visibility (VV) into an obscuration.'
      },
      {
        q: 'What are the four VFR flight weather categories based on ceiling and visibility?',
        a: '1) VFR: Ceiling > 3,000 ft and visibility > 5 SM. 2) MVFR (Marginal VFR): Ceiling 1,000 to 3,000 ft and/or visibility 3 to 5 SM. 3) IFR: Ceiling 500 to <1,000 ft and/or visibility 1 to <3 SM. 4) LIFR (Low IFR): Ceiling < 500 ft and/or visibility < 1 SM.'
      },
      {
        q: 'What is the significance of a close temperature and dew point spread (within 3°C / 5°F)?',
        a: 'High relative humidity indicates saturation is imminent, signaling a high probability of fog, low stratus clouds, or dew formation.'
      },
      {
        q: 'What is a PIREP and what are the two main types?',
        a: 'Pilot Weather Report. Types: Routine (UA) and Urgent (UUA, issued for tornadoes, severe/extreme turbulence, severe icing, volcanic ash, or low-level wind shear).'
      },
      {
        q: 'What is virga and what hazard does it pose to aircraft?',
        a: 'Precipitation falling from high clouds that evaporates before reaching the surface, creating intense downdrafts, turbulence, and severe microbursts.'
      }
    ]
  },

  // Topic 4: Cross-Country Planning & Navigation (ACS Area I. Task D & Area VI) - 22 questions
  navigation: {
    name: 'Flight Planning & Navigation',
    questions: [
      {
        q: 'What is Pilotage vs. Dead Reckoning?',
        a: 'Pilotage is navigation by visual reference to prominent landmarks on aeronautical charts. Dead reckoning is navigation by calculating heading and groundspeed from airspeed, course, wind, and elapsed time.'
      },
      {
        q: 'What are the Day VFR fuel reserve requirements under 14 CFR 91.151?',
        a: 'Sufficient fuel to fly to the first point of intended landing and, assuming normal cruising fuel consumption, at least 30 minutes of additional reserve fuel.'
      },
      {
        q: 'What are the Night VFR fuel reserve requirements under 14 CFR 91.151?',
        a: 'Sufficient fuel to fly to the destination and, assuming normal cruising speed, at least 45 minutes of additional reserve fuel.'
      },
      {
        q: 'What is True Heading (TH) vs. Magnetic Heading (MH) vs. Compass Heading (CH)?',
        a: 'True Course (TC) ± Wind Correction Angle (WCA) = True Heading (TH). TH ± Magnetic Variation = Magnetic Heading (MH). MH ± Compass Deviation = Compass Heading (CH).'
      },
      {
        q: 'What is an isogonic line on a sectional chart?',
        a: 'A dashed magenta line connecting points of equal magnetic variation between True North and Magnetic North (e.g., "6°E").'
      },
      {
        q: 'What is Magnetic Deviation and where is it found in the aircraft?',
        a: 'Compass error caused by magnetic fields generated by the aircraft’s electrical wiring, engine, and radio equipment. Found on the Compass Deviation Card mounted near the magnetic compass.'
      },
      {
        q: 'What is the "5 Cs" procedure when lost in flight?',
        a: '1) Climb (for better radio reception and visual range), 2) Communicate (contact ATC, FSS, or 121.5), 3) Confess (state lost situation clearly), 4) Comply (follow ATC radar vectors or instructions), 5) Conserve (reduce power for maximum endurance).'
      },
      {
        q: 'What are the required steps to execute a diversion to an alternate airport in flight?',
        a: '1) Identify present location, 2) Turn to approximate heading toward alternate immediately, 3) Measure distance, calculate groundspeed, estimate time en route (ETE), and calculate fuel required, 4) Contact ATC/FSS to update flight plan.'
      },
      {
        q: 'How does a VOR station work and what does the CDI needle indicate?',
        a: 'Transmits 360 radial signals outward from the station using phase-comparison VHF signals. The CDI (Course Deviation Indicator) needle indicates lateral deviation from the selected radial.'
      },
      {
        q: 'How do you positively identify a VOR station before navigating by it?',
        a: 'Tune the Morse code audio identifier or voice broadcast transmitted on the station frequency and listen to verify the 3-letter station identifier.'
      },
      {
        q: 'What is Reverse Sensing on a VOR and when does it occur?',
        a: 'When the CDI needle deflects in the opposite direction of the actual aircraft position relative to the selected course. Occurs when flying a heading opposite to the course set in the OBS (e.g. TO flag shown when flying away).'
      },
      {
        q: 'What is RAIM in GPS navigation and how many satellites are required for it?',
        a: 'Receiver Autonomous Integrity Monitoring. Evaluates GPS signal integrity and detects faulty satellite signals. Requires a minimum of 5 satellites (or 4 satellites + barometric altimeter aiding).'
      },
      {
        q: 'What is WAAS (Wide Area Augmentation System)?',
        a: 'A satellite-and-ground-based system that augments GPS signals to provide enhanced precision, integrity, and vertical guidance down to LPV approach minimums.'
      },
      {
        q: 'What VFR cruising altitudes apply on magnetic courses of 000° to 179°? (14 CFR 91.159)',
        a: 'Odd thousand foot MSL altitudes plus 500 feet (e.g., 3,500 ft, 5,500 ft, 7,500 ft) above 3,000 feet AGL up to 18,000 feet MSL.'
      },
      {
        q: 'What VFR cruising altitudes apply on magnetic courses of 180° to 359°? (14 CFR 91.159)',
        a: 'Even thousand foot MSL altitudes plus 500 feet (e.g., 4,500 ft, 6,500 ft, 8,500 ft) above 3,000 feet AGL up to 18,000 feet MSL.'
      },
      {
        q: 'What is a Flight Service Station (FSS) and how can a pilot contact them in flight?',
        a: 'FAA air traffic facility providing weather briefings, flight plan filing, and in-flight advisories. Contacted on 122.2 MHz or via local RCO/VOR frequencies listed on the sectional chart.'
      },
      {
        q: 'What are the three types of weather briefings available from FSS (1-800-WX-BRIEF)?',
        a: '1) Standard briefing (complete briefing for a planned flight), 2) Abbreviated briefing (updates specific items), 3) Outlook briefing (for flights departing 6 or more hours in the future).'
      },
      {
        q: 'What is a NOTAM (Notice to Air Missions) and what are the main types?',
        a: 'Time-critical aeronautical information. Types: NOTAM (D) for taxiway/runway closures, airport lighting, equipment; FDC NOTAM for regulatory changes, instrument procedures, TFRs; Pointer NOTAM; Military NOTAM.'
      },
      {
        q: 'What is Maximum Elevation Figure (MEF) on a VFR Sectional Chart?',
        a: 'The large blue numbers in each quadrangle indicating the elevation of the highest known feature (terrain or obstruction) rounded up, with a safety buffer added (100–300 ft).'
      },
      {
        q: 'What must a pilot do when opening and closing a VFR flight plan?',
        a: 'Opening: Contact FSS by radio or phone after takeoff to activate the flight plan. Closing: Contact FSS immediately upon landing to prevent initiating search and rescue (SAR).'
      },
      {
        q: 'What is a Temporary Flight Restriction (TFR) and what regulation enforces it?',
        a: 'Designated airspace temporarily restricting flight operations for presidential travel, disaster relief, major sporting events, or space launches (14 CFR 91.137, 91.141).'
      },
      {
        q: 'What information must a pilot become familiar with before any flight under 14 CFR 91.103? (NWKRAFT)',
        a: 'N - NOTAMs, W - Weather reports and forecasts, K - Known ATC traffic delays, R - Runway lengths of airports of intended use, A - Alternates available, F - Fuel requirements, T - Takeoff and landing distance data.'
      }
    ]
  },

  // Topic 5: National Airspace System (ACS Area I. Task E) - 24 questions
  airspace: {
    name: 'National Airspace System',
    questions: [
      {
        q: 'What are the vertical and lateral dimensions of Class A Airspace?',
        a: 'From 18,000 feet MSL up to and including Flight Level 600 (60,000 ft MSL) across the contiguous 48 states and Alaska within 12 nautical miles of the coast.'
      },
      {
        q: 'What are the entry, equipment, and pilot requirements for Class A Airspace?',
        a: 'Must be on an IFR flight plan with an ATC clearance, instrument-rated pilot, aircraft equipped with two-way radio, Mode C transponder, ADS-B Out, and altimeter set to 29.92.'
      },
      {
        q: 'What are the dimensions and charting depiction of Class B Airspace?',
        a: 'Depicted by solid blue lines, individually tailored (upside-down wedding cake), typically surface to 10,000 feet MSL with an inner core (surface-10,000) and outer shelves.'
      },
      {
        q: 'What are the weather minimums, entry requirement, and equipment for Class B Airspace?',
        a: 'Weather: 3 statute miles visibility and clear of clouds. Entry: Explicit ATC clearance ("Cleared into Class Bravo airspace"). Equipment: Two-way radio, Mode C transponder, ADS-B Out (and Mode C Veil within 30 NM).'
      },
      {
        q: 'What is the maximum airspeed permitted within Class B Airspace and in the airspace underlying Class B? (14 CFR 91.117)',
        a: 'Within Class B: 250 knots IAS (below 10,000 ft MSL). Underlying Class B or in a VFR corridor through Class B: 200 knots IAS.'
      },
      {
        q: 'What are the dimensions and charting depiction of Class C Airspace?',
        a: 'Solid magenta lines. Core: Surface to 4,000 ft AGL (5 NM radius). Shelf: 1,200 ft to 4,000 ft AGL (10 NM radius). Outer area: 20 NM radius.'
      },
      {
        q: 'What are the weather minimums and entry requirements for Class C Airspace?',
        a: 'Weather: 3 statute miles visibility, 500 ft below, 1,000 ft above, 2,000 ft horizontal from clouds (3-152). Entry: Two-way radio communication established (ATC must state your full aircraft callsign).'
      },
      {
        q: 'What happens if ATC responds to your callsign with "Stand by" before entering Class C or Class D?',
        a: 'Two-way radio communication is officially established, and you may enter the airspace unless ATC explicitly says "Aircraft calling, remain outside the Class C/D airspace."'
      },
      {
        q: 'What are the dimensions and charting depiction of Class D Airspace?',
        a: 'Dashed blue line. Typically surface up to 2,500 feet AGL tailored around an operating control tower (approximately 4 to 5 NM radius).'
      },
      {
        q: 'What are the weather minimums and entry requirement for Class D Airspace?',
        a: 'Weather: 3 statute miles visibility, 500 ft below, 1,000 ft above, 2,000 ft horizontal from clouds (3-152). Entry: Establish two-way radio communications prior to entry.'
      },
      {
        q: 'What is the maximum indicated airspeed permitted within 4 NM of the primary airport in Class C or Class D below 2,500 ft AGL?',
        a: '200 knots IAS.'
      },
      {
        q: 'What are the lateral boundaries and starting altitudes of Class E Airspace?',
        a: 'Surface (dashed magenta), 700 ft AGL (fuzzy magenta vignette), 1,200 ft AGL (fuzzy blue vignette or default floor), up to but not including 18,000 ft MSL, and above FL600.'
      },
      {
        q: 'What are the VFR weather minimums in Class E Airspace below 10,000 feet MSL?',
        a: '3 statute miles visibility, 500 ft below, 1,000 ft above, and 2,000 ft horizontal from clouds (3-152).'
      },
      {
        q: 'What are the VFR weather minimums in Class E Airspace at or above 10,000 feet MSL?',
        a: '5 statute miles visibility, 1,000 ft below, 1,000 ft above, and 1 statute mile horizontal from clouds (5-111).'
      },
      {
        q: 'What are the Daytime VFR weather minimums in Class G Airspace at 1,200 feet AGL or less?',
        a: '1 statute mile visibility and clear of clouds.'
      },
      {
        q: 'What are the Nighttime VFR weather minimums in Class G Airspace at 1,200 feet AGL or less?',
        a: '3 statute miles visibility, 500 ft below, 1,000 ft above, and 2,000 ft horizontal from clouds (3-152).'
      },
      {
        q: 'What is Special VFR (SVFR) and what are its requirements in controlled airspace at the surface? (14 CFR 91.157)',
        a: 'Allows VFR flight within Class B, C, D, or E surface areas when weather is below standard VFR minimums. Requires ATC clearance, at least 1 SM flight visibility, and clear of clouds. At night: instrument-rated pilot and IFR-equipped airplane.'
      },
      {
        q: 'What is a Prohibited Area and can a pilot fly through it?',
        a: 'Airspace established for national security or welfare (e.g. White House, Camp David). Flight of aircraft is strictly prohibited at all times.'
      },
      {
        q: 'What is a Restricted Area and under what conditions can a civilian VFR pilot enter it?',
        a: 'Airspace with unusual, often invisible hazards (artillery, guided missiles). VFR flight is permitted only with authorization from the controlling or using agency when the area is inactive (cold).'
      },
      {
        q: 'What is a Military Operations Area (MOA) and what is the VFR pilot’s responsibility?',
        a: 'Airspace separating non-hazardous military activities (aerobatics, high-speed training) from IFR traffic. VFR pilots may enter without clearance, but should exercise extreme caution and contact controlling agency for activity status.'
      },
      {
        q: 'What is an Alert Area vs. a Warning Area?',
        a: 'Alert Area: Informs pilots of high volume of pilot training or unusual aeronautical activity; all flight operations are permitted. Warning Area: Extends 3 NM outward from the coast containing hazardous activities over domestic/international waters.'
      },
      {
        q: 'What is a Controlled Firing Area (CFA)?',
        a: 'Activities suspended immediately when a spotter aircraft, radar, or lookout detects an approaching aircraft. CFAs are not depicted on aeronautical charts.'
      },
      {
        q: 'What is the altitude restriction when flying over designated National Parks, Wilderness Areas, and Wildlife Refuges?',
        a: 'Pilots are requested to maintain a minimum altitude of at least 2,000 feet AGL above the surface.'
      },
      {
        q: 'What is an Air Defense Identification Zone (ADIZ)?',
        a: 'An area of airspace over land or water in which the ready identification, location, and control of civil aircraft is required in the interest of national security; requires an active IFR or Defense VFR (DVFR) flight plan.'
      }
    ]
  },

  // Topic 6: Performance, Aerodynamics, & Weight/Balance (ACS Area I. Task F) - 22 questions
  performance: {
    name: 'Performance & Aerodynamics',
    questions: [
      {
        q: 'What is Density Altitude and what factors cause it to increase?',
        a: 'Pressure altitude corrected for non-standard temperature (the altitude the airplane "feels" like it is flying at). Increases with: 1) High temperature, 2) High elevation / low pressure, 3) High relative humidity.'
      },
      {
        q: 'How does high density altitude degrade aircraft performance?',
        a: '1) Longer takeoff roll distance, 2) Reduced rate and angle of climb, 3) Reduced engine horsepower output, 4) Reduced propeller thrust efficiency, 5) Higher true airspeed on landing approach resulting in longer landing roll.'
      },
      {
        q: 'What is Pressure Altitude and how is it determined?',
        a: 'Altitude indicated when the altimeter barometric scale is set to standard sea-level pressure (29.92 inHg), or calculated: Pressure Altitude = Indicated Altitude + [(29.92 - Current Altimeter Setting) × 1,000].'
      },
      {
        q: 'What are the flight characteristics of an aircraft loaded with an Aft Center of Gravity (CG)?',
        a: '1) Lower stall speed, 2) Faster cruising speed, 3) Decreased longitudinal stability, 4) Light control forces, 5) Dangerous or impossible stall/spin recovery.'
      },
      {
        q: 'What are the flight characteristics of an aircraft loaded with a Forward Center of Gravity (CG)?',
        a: '1) Higher stall speed, 2) Slower cruise speed (higher trim drag), 3) Increased longitudinal stability, 4) Heavy pitch control forces, 5) Difficulty flaring on landing.'
      },
      {
        q: 'What is Maneuvering Speed (Va) and why does it decrease as aircraft weight decreases?',
        a: 'The maximum speed at which full, abrupt control deflection can be made without causing structural damage. At lighter weights, the wing flies at a lower angle of attack and requires less gust/load to exceed structural limits before stalling.'
      },
      {
        q: 'Define: Vs0, Vs1, Vx, Vy, Vfe, Vno, Vne, and Vg.',
        a: 'Vs0: Stall speed in landing config; Vs1: Stall speed in clean config; Vx: Best angle of climb; Vy: Best rate of climb; Vfe: Max flap extended speed; Vno: Max structural cruising speed; Vne: Never exceed speed; Vg: Best glide speed.'
      },
      {
        q: 'What is the difference between Best Angle of Climb (Vx) and Best Rate of Climb (Vy)?',
        a: 'Vx gains the greatest altitude in a given horizontal distance (clearing obstacles). Vy gains the greatest altitude in a given amount of time (standard climbout).'
      },
      {
        q: 'What is Ground Effect and when is it encountered?',
        a: 'A reduction in aerodynamic drag (induced drag) and downward deflection of air that occurs when an aircraft flies within one wingspan distance above the ground surface.'
      },
      {
        q: 'What are the hazards associated with Ground Effect during takeoff and landing?',
        a: 'Takeoff: Aircraft may lift off prematurely below normal flying speed and fail to climb out of ground effect. Landing: Aircraft tends to float down the runway if carrying excess airspeed.'
      },
      {
        q: 'What are the two primary types of aerodynamic drag?',
        a: '1) Parasite drag (form drag, skin friction drag, interference drag; increases with the square of airspeed). 2) Induced drag (byproduct of lift/wingtip vortices; decreases as airspeed increases).'
      },
      {
        q: 'What is the Angle of Attack (AOA) and what causes an aerodynamic stall?',
        a: 'The acute angle between the wing chord line and the relative wind. A stall occurs when the critical angle of attack is exceeded, disrupting smooth airflow over the upper wing surface.'
      },
      {
        q: 'Can an aircraft stall at any airspeed and in any flight attitude?',
        a: 'Yes. An aircraft will always stall whenever the critical angle of attack is exceeded, regardless of airspeed, pitch attitude, power setting, or weight.'
      },
      {
        q: 'What is Load Factor (G-load) and how does bank angle in a level turn affect it?',
        a: 'The ratio of total aerodynamic lift produced by the wings to the total weight of the airplane. At 60° bank in a level turn, load factor is 2.0 Gs, increasing the stall speed by 41%.'
      },
      {
        q: 'What is Wake Turbulence, what aircraft produce the strongest vortices, and how do they move?',
        a: 'Counter-rotating wingtip vortices created whenever a wing generates lift. Strongest from Heavy, Clean, and Slow aircraft. Vortices sink at 400–500 fpm and drift with ambient wind.'
      },
      {
        q: 'How should a pilot avoid wake turbulence when taking off behind a departing large aircraft?',
        a: 'Lift off prior to the large aircraft’s rotation point and climb out above its flight path, or turn away from its departure heading.'
      },
      {
        q: 'How should a pilot avoid wake turbulence when landing behind a large arriving aircraft?',
        a: 'Stay at or above the large aircraft’s final approach flight path and touch down beyond the point where its nose gear contacted the runway.'
      },
      {
        q: 'What is Hydroplaning and what are the three types?',
        a: 'Tires lose contact with the runway surface by riding on a film of water. Types: 1) Dynamic (standing water), 2) Reverted rubber (locked wheel steam), 3) Viscous (thin film on smooth runway).'
      },
      {
        q: 'What is the formula to calculate Datum, Arm, Moment, and CG in Weight & Balance?',
        a: 'Weight × Arm = Moment. Total Moment ÷ Total Weight = Center of Gravity (CG) location.'
      },
      {
        q: 'What effect does excess weight have on aircraft performance?',
        a: 'Higher takeoff speed, longer takeoff and landing rolls, reduced climb rate, lower service ceiling, reduced cruising speed, shorter range, and higher stall speed.'
      },
      {
        q: 'What is the difference between Service Ceiling and Absolute Ceiling?',
        a: 'Service Ceiling: The maximum density altitude where the aircraft can still climb at 100 feet per minute. Absolute Ceiling: The altitude where the climb rate drops to exactly zero.'
      },
      {
        q: 'What is Torque Effect and what four forces contribute to left-turning tendency?',
        a: '1) Torque reaction (Newton’s 3rd law), 2) Gyroscopic precession, 3) Asymmetric propeller loading (P-factor), 4) Spiraling slipstream striking the left side of the vertical tail.'
      }
    ]
  },

  // Topic 7: Aircraft Systems & Maintenance (ACS Area I. Task G) - 22 questions
  systems: {
    name: 'Aircraft Systems & Engine',
    questions: [
      {
        q: 'How does a four-stroke internal combustion aircraft engine operate?',
        a: '1) Intake (fuel/air drawn in), 2) Compression (piston compresses mixture), 3) Power (spark ignites mixture, driving piston down), 4) Exhaust (burned gases expelled).'
      },
      {
        q: 'How does the aircraft ignition system work and why does it use dual magnetos?',
        a: 'Magnetos are self-contained engine-driven electrical generators that supply high voltage to spark plugs independently of the aircraft battery. Dual magnetos provide redundancy and improved combustion efficiency.'
      },
      {
        q: 'What causes Carburetor Icing, what are the first indications in a fixed-pitch propeller airplane, and how is it resolved?',
        a: 'Vaporization of fuel and pressure drop in the venturi cools intake air by up to 40°F (21°C). First indication is a drop in RPM followed by engine roughness. Apply full Carburetor Heat immediately.'
      },
      {
        q: 'Under what atmospheric conditions can carburetor icing occur?',
        a: 'Outside air temperatures between 20°F and 70°F (-7°C to 21°C) with high relative humidity (above 80%), and even up to 100°F with moist air.'
      },
      {
        q: 'What is Detonation, what causes it, and how is it corrected in flight?',
        a: 'An uncontrolled, explosive ignition of the fuel/air mixture inside the cylinder. Caused by low fuel grade, high cylinder head temps, or excessively lean mixture. Correct by enriching mixture, lowering nose to increase cooling airflow, and reducing power.'
      },
      {
        q: 'What is Pre-ignition and how does it differ from detonation?',
        a: 'Premature ignition of the fuel/air charge before normal spark plug firing, caused by residual hot spots, glowing carbon deposits, or cracked spark plug ceramic.'
      },
      {
        q: 'What aviation fuel grades exist, what are their colors, and what happens if different grades are mixed?',
        a: '100LL: Blue; 100: Green; 82UL: Purple; Jet A: Clear/Straw. If mixed, fuel becomes clear. Always use the approved rating or next higher grade if unavailable; never use lower octane.'
      },
      {
        q: 'What is Fuel Vapor Lock and when is it most likely to occur?',
        a: 'Fuel vaporizes in fuel lines due to high ambient temperatures and low atmospheric pressure, blocking liquid fuel flow to the engine (common during hot-weather ground operations).'
      },
      {
        q: 'What instruments operate off the Pitot-Static System?',
        a: 'Airspeed Indicator (uses both pitot impact pressure and static ambient pressure), Altimeter (static pressure only), and Vertical Speed Indicator (static pressure only).'
      },
      {
        q: 'What happens to the Airspeed Indicator if the pitot tube becomes completely blocked while the drain hole remains open?',
        a: 'The airspeed indicator will drop to zero because ram air pressure vents out the drain hole.'
      },
      {
        q: 'What happens to the Airspeed Indicator if both the pitot tube opening and the drain hole are blocked by ice?',
        a: 'The airspeed indicator acts like an altimeter: it indicates higher airspeed as the aircraft climbs and lower airspeed as the aircraft descends.'
      },
      {
        q: 'What happens to the Altimeter, VSI, and Airspeed Indicator if the static port becomes completely blocked?',
        a: 'Altimeter freezes at the altitude where blockage occurred; VSI freezes at zero; Airspeed Indicator reads erroneously low at altitudes higher than where blocked, and erroneously high at lower altitudes.'
      },
      {
        q: 'What indications occur when switching to the Alternate Static Source inside an unpressurized cabin?',
        a: 'Cabin air pressure is lower due to venturi airflow around the fuselage. Result: Altimeter reads slightly higher than actual, Airspeed reads slightly faster, and VSI momentarily indicates a climb.'
      },
      {
        q: 'What two fundamental gyroscopic principles govern the Attitude Indicator, Heading Indicator, and Turn Coordinator?',
        a: '1) Rigidity in Space (a spinning rotor remains in a fixed plane of rotation), 2) Gyroscopic Precession (a tilting force applied is manifested 90 degrees later in the direction of rotation).'
      },
      {
        q: 'What is the difference between a Turn-and-Slip Indicator and a Turn Coordinator?',
        a: 'Turn-and-Slip Indicator senses rate of yaw only. Turn Coordinator has a canted gyro gimbal (typically 30°) allowing it to sense both rate of roll and rate of yaw.'
      },
      {
        q: 'What are the magnetic compass acceleration/deceleration errors (ANDS)?',
        a: 'When on an East or West heading in the Northern Hemisphere: Accelerate North, Decelerate South. On North or South headings, no acceleration error occurs.'
      },
      {
        q: 'What are the magnetic compass turning errors (UNOS)?',
        a: 'When turning from a North heading: compass initially leads turn in opposite direction (Undershoot North). When turning from a South heading: compass leads ahead of the turn (Overshoot South).'
      },
      {
        q: 'How does the cabin heating system operate in single-engine training aircraft and what hazard exists?',
        a: 'Ambient air is ducted over a shroud surrounding the hot engine exhaust muffler into the cabin. Hazard: A crack in the exhaust muffler allows lethal, odorless Carbon Monoxide (CO) to enter the cabin.'
      },
      {
        q: 'What are the primary electrical components and what does a zero reading on an ammeter indicate?',
        a: 'Alternator/generator, battery, master switch, bus bars, circuit breakers/fuses. A zero reading on a center-zero ammeter indicates the alternator is supplying all electrical load and the battery is fully charged.'
      },
      {
        q: 'What is a Constant-Speed Propeller and what controls engine RPM vs. Manifold Pressure?',
        a: 'Propeller governor adjusts blade pitch automatically. Throttle controls Manifold Pressure (engine power output); Propeller control lever adjusts engine RPM.'
      },
      {
        q: 'What is the proper procedure when resetting a popped circuit breaker in flight?',
        a: 'Allow the breaker to cool (2–3 minutes). Reset it only once if the circuit is critical for safety of flight. If it pops again, leave it open to prevent electrical fire.'
      },
      {
        q: 'What is the function of the oil system in an aircraft engine?',
        a: 'Lubrication of moving parts, cooling engine components, cleaning impurities, sealing cylinder walls, and actuating constant-speed propeller governors.'
      }
    ]
  },

  // Topic 8: Human Factors & Aeromedical (ACS Area I. Task H) - 20 questions
  humanFactors: {
    name: 'Human Factors & Aeromedical',
    questions: [
      {
        q: 'What is Hypoxia and what are the four distinct types?',
        a: 'A state of oxygen deficiency in the body. Types: 1) Hypoxic hypoxia (insufficient oxygen pressure at high altitude), 2) Hypemic hypoxia (inability of blood to carry O2, e.g. CO poisoning), 3) Stagnant hypoxia (poor blood circulation from G-forces), 4) Histotoxic hypoxia (cells poisoned by alcohol/drugs).'
      },
      {
        q: 'What are the supplemental oxygen requirements for crew and passengers under 14 CFR 91.211?',
        a: '12,500 to 14,000 ft MSL: Minimum flight crew must use O2 for time exceeding 30 minutes. >14,000 ft MSL: Flight crew must use O2 continuously. >15,000 ft MSL: Each occupant must be provided supplemental O2.'
      },
      {
        q: 'What is Hyperventilation, what are its symptoms, and how is it treated?',
        a: 'Excessive loss of carbon dioxide from rapid breathing caused by stress/anxiety. Symptoms: lightheadedness, tingling fingers/toes, muscle spasms. Treatment: slow breathing rate, breathe into a paper bag, or talk aloud.'
      },
      {
        q: 'What is Carbon Monoxide (CO) Poisoning, what are its symptoms, and what is the immediate pilot action?',
        a: 'CO binds with hemoglobin 200 times more readily than oxygen. Symptoms: headache, blurred vision, dizziness, cherry-red lips/fingernails. Action: Turn off cabin heat, open all fresh air vents, and land immediately.'
      },
      {
        q: 'What causes Spatial Disorientation and how should a pilot overcome it?',
        a: 'Conflicting signals between the visual system, vestibular system (inner ear semicircular canals/otolith organs), and postural kinesthetic senses in IMC. Overcome by completely ignoring body sensations and trusting instrument indications.'
      },
      {
        q: 'What are "The Leans" vestibular illusion?',
        a: 'An abrupt correction of an unnoticed bank creates the illusion of banking in the opposite direction, causing the pilot to lean or roll back into the original turn.'
      },
      {
        q: 'What is the Coriolis Illusion and when does it occur?',
        a: 'A sudden, rapid head movement during a prolonged turn sets fluid in motion in multiple semicircular canals, creating an overwhelming sensation of tumbling or rolling on a totally different axis.'
      },
      {
        q: 'What are the FAA recommended waiting times before flying after scuba diving? (AIM 8-1-2)',
        a: 'Flights up to 8,000 ft MSL: Wait at least 12 hours after non-decompression stop diving; at least 24 hours after controlled decompression diving. Flights above 8,000 ft MSL: Wait at least 24 hours after any diving.'
      },
      {
        q: 'What are the FAA regulations regarding alcohol consumption and flying? (14 CFR 91.17)',
        a: '1) At least 8 hours "bottle to throttle", 2) Blood alcohol concentration (BAC) less than 0.04%, 3) Not under the influence of alcohol or suffering after-effects (hangover).'
      },
      {
        q: 'What is the IMSAFE checklist for personal aeromedical preflight fitness?',
        a: 'I - Illness, M - Medication, S - Stress, A - Alcohol, F - Fatigue, E - Emotion / Eating.'
      },
      {
        q: 'What are the 5 Hazardous Attitudes and their recognized FAA antidotes?',
        a: '1) Anti-authority ("Follow the rules"), 2) Impulsivity ("Not so fast, think first"), 3) Invulnerability ("It could happen to me"), 4) Macho ("Taking chances is foolish"), 5) Resignation ("I am not helpless, I can make a difference").'
      },
      {
        q: 'What is the PAVE checklist for risk management?',
        a: 'P - Pilot (fitness, currency, proficiency), A - Aircraft (airworthiness, equipment, performance), V - enVironment (weather, airspace, terrain), E - External Pressures (schedule, passengers).'
      },
      {
        q: 'What is the DECIDE model in Aeronautical Decision Making (ADM)?',
        a: 'D - Detect the change, E - Estimate the need to react, C - Choose desired outcome, I - Identify action options, D - Do the necessary action, E - Evaluate results of action.'
      },
      {
        q: 'What optical illusions occur when landing on a narrower-than-usual runway vs. a wider-than-usual runway?',
        a: 'Narrow runway: Creates illusion aircraft is higher than actual (pilot flies lower approach, risk of undershoot). Wide runway: Creates illusion aircraft is lower than actual (pilot flares too high, risk of hard landing).'
      },
      {
        q: 'What optical illusion occurs when landing on an up-sloping vs. down-sloping runway?',
        a: 'Upsloping runway: Illusion aircraft is high (pilot flies flat approach). Downsloping runway: Illusion aircraft is low (pilot flies steep approach).'
      },
      {
        q: 'What is Featureless Terrain Illusion (Black Hole Approach)?',
        a: 'Absence of ground features or lighting over water/dark terrain creates the illusion that the aircraft is at a higher altitude than it actually is, causing pilots to fly dangerously low approaches.'
      },
      {
        q: 'What is Middle Ear and Sinus Blockage (Barotrauma) and when is it most painful?',
        a: 'Trapped air in middle ear or sinus cavities cannot equalize with outside ambient pressure during descent, causing severe pain. Clear by swallowing, yawning, or gentle Valsalva maneuver. Avoid flying with a cold.'
      },
      {
        q: 'How long does dark adaptation take for night vision and what degrades it?',
        a: 'Takes approximately 30 minutes in dim light. Degraded by bright white light exposure, hypoxia, smoking/carbon monoxide, fatigue, and vitamin deficiency.'
      },
      {
        q: 'What is Autokinesis and how is it avoided at night?',
        a: 'A stationary point of light in total darkness appears to move after staring at it for several seconds. Avoid by scanning eyes continuously around the visual field.'
      },
      {
        q: 'What are the three components of Single-Pilot Resource Management (SRM)?',
        a: 'Managing all resources: Aeronautical Decision Making (ADM), Risk Management (RM), Task Management (TM), Situational Awareness (SA), Controlled Flight Into Terrain (CFIT) awareness, and Automation Management (AM).'
      }
    ]
  },

  // Topic 9: Airport Operations & Communications (ACS Area III) - 22 questions
  airportOps: {
    name: 'Airport Operations & Communications',
    questions: [
      {
        q: 'What do Runway Hold Short markings look like and what action is required before crossing? (AIM 2-3-5)',
        a: 'Four yellow lines (two solid, two dashed). The solid lines are on the side where the aircraft must hold short. Do not cross solid lines onto a runway without explicit ATC clearance.'
      },
      {
        q: 'What are Enhanced Taxiway Centerline markings and what do they warn?',
        a: 'Dashed yellow lines on each side of the existing solid taxiway centerline extending 150 feet prior to a runway holding position, warning the pilot an active runway is approaching.'
      },
      {
        q: 'What does a Displaced Threshold marking look like and what operations are permitted on it?',
        a: 'White arrows pointing to a solid white threshold line. Permitted for taxiing, takeoff rollout, and landing rollout from the opposite direction, but strictly prohibited for landing touchdown.'
      },
      {
        q: 'What are Chevrons (Yellow arrows) on a paved surface prior to a runway threshold?',
        a: 'Indicate blast pads, stopways, or EMAS (engineered materials arrestor system). Unusable for taxiing, takeoff, or landing under any circumstances.'
      },
      {
        q: 'What are the civilian and military land airport beacon colors?',
        a: 'Civilian land: Alternating flashing White and Green. Military land: Dual-peaked (two quick flashes) White alternating with Green. Water airport: White and Yellow. Heliport: White, Yellow, Green.'
      },
      {
        q: 'What does an illuminated airport beacon operating during daytime hours indicate at Class B, C, D, or E surface areas?',
        a: 'Indicates the ground visibility is less than 3 statute miles and/or the cloud ceiling is less than 1,000 feet AGL (airport is operating under IFR).'
      },
      {
        q: 'What does a Precision Approach Path Indicator (PAPI) display when on glidepath?',
        a: 'Two white lights on the left and two red lights on the right (2 White / 2 Red = On 3° Glidepath. All Red = Too Low. All White = Too High).'
      },
      {
        q: 'What does a Visual Approach Slope Indicator (VASI) display when on glidepath?',
        a: 'Red over White (Red on top, White on bottom: "Red over White, you\'re all right; White over White, high as a kite; Red over Red, you\'re dead").'
      },
      {
        q: 'What are the standard light gun signals in flight from an airport control tower?',
        a: 'Steady Green: Cleared to land; Flashing Green: Return for landing; Steady Red: Give way and continue circling; Flashing Red: Airport unsafe, do not land; Flashing White: Not applicable in flight; Alternating Red/Green: Exercise extreme caution.'
      },
      {
        q: 'What are the standard light gun signals on the ground from an airport control tower?',
        a: 'Steady Green: Cleared for takeoff; Flashing Green: Cleared to taxi; Steady Red: STOP; Flashing Red: Taxi clear of runway in use; Flashing White: Return to starting point on airport; Alternating Red/Green: Exercise extreme caution.'
      },
      {
        q: 'What are Land and Hold Short Operations (LAHSO) and who can decline them?',
        a: 'ATC procedure permitting landing on one runway with instructions to hold short of an intersecting runway or taxiway. The PIC has full authority to decline LAHSO anytime safety is compromised. Student pilots cannot accept LAHSO.'
      },
      {
        q: 'What is the standard traffic pattern altitude and standard turn direction at non-towered airports?',
        a: 'Standard pattern altitude is 1,000 feet AGL; standard turns are left turns unless the sectional chart or Chart Supplement specifies right traffic (RP).'
      },
      {
        q: 'What is the recommended entry procedure for a non-towered airport traffic pattern? (AIM 4-3-3)',
        a: 'Enter at a 45° angle to the downwind leg at midfield at pattern altitude, while broadcasting position and intentions on the CTAF.'
      },
      {
        q: 'What radio calls should be made when operating at a non-towered airport?',
        a: '1) 10 miles out, 2) Entering 45° to downwind, 3) Turning downwind, 4) Turning base, 5) Turning final, 6) Clear of runway.'
      },
      {
        q: 'What is UNICOM vs. CTAF vs. MULTICOM?',
        a: 'CTAF: Common Traffic Advisory Frequency for advisory radio calls. UNICOM: Nongovernment station providing airport advisory info (fuel, parking). MULTICOM (122.9): Used at airports without a tower, FSS, or UNICOM.'
      },
      {
        q: 'What transponder squawk codes are reserved for emergency, radio failure, and hijacking?',
        a: '7700: General Emergency; 7600: Lost Radio Communications; 7500: Hijacking / Unlawful Interference.'
      },
      {
        q: 'What is the standard emergency distress and urgency phraseology on VHF radio?',
        a: 'Distress (immediate danger): "MAYDAY, MAYDAY, MAYDAY". Urgency (safety concern): "PAN-PAN, PAN-PAN, PAN-PAN".'
      },
      {
        q: 'What are Mandatory Instruction Signs at an airport and how are they identified?',
        a: 'White letters on a Red background (e.g. runway hold-short signs, prohibited areas). Aircraft must stop and hold until cleared by ATC.'
      },
      {
        q: 'What are Location Signs vs. Direction Signs at an airport?',
        a: 'Location Sign: Yellow letters on a Black background ("Black square, you\'re there"). Direction Sign: Black letters with directional arrows on a Yellow background ("Yellow arrays point the ways").'
      },
      {
        q: 'What color are Runway Edge Lights and Taxiway Edge Lights?',
        a: 'Runway Edge: White (yellow on last 2,000 ft or half of instrument runways). Taxiway Edge: Blue (Omnidirectional). Taxiway Centerline: Green.'
      },
      {
        q: 'What are Runway Incursion categories and how can a pilot prevent incursions?',
        a: 'Unauthorized presence of aircraft/vehicle on a runway. Prevention: Study airport diagram before taxiing, write down ATC taxi clearances, read back all runway hold-short instructions, and keep all exterior lights on.'
      },
      {
        q: 'What is the right-of-way hierarchy for different categories of aircraft? (14 CFR 91.113)',
        a: '1) Aircraft in distress, 2) Balloons, 3) Gliders, 4) Airships, 5) Powered parachutes/weight-shift, 6) Airplanes and Rotorcraft. (Any aircraft towing or refueling has right-of-way over other engine-driven aircraft).'
      }
    ]
  },

  // Topic 10: Slow Flight, Stalls, & Maneuvers (ACS Area V & VII) - 18 questions
  maneuvers: {
    name: 'Slow Flight, Stalls, & Maneuvers',
    questions: [
      {
        q: 'What is the ACS objective and performance standard for Maneuvering During Slow Flight? (ACS Area VII. Task A)',
        a: 'Establish and maintain an airspeed at which any further increase in angle of attack, increase in load factor, or reduction in power would immediately result in a stall warning (stall horn/buffet). Maintain: Alt ±100 ft, Hdg ±10°, Airspeed +10/-0 kts, Bank ±5°.'
      },
      {
        q: 'What are the primary flight characteristics when flying in slow flight?',
        a: 'Controls feel sluggish and mushy, nose-high pitch attitude, high power setting required to maintain altitude, strong left-turning tendency (high P-factor/torque requiring right rudder).'
      },
      {
        q: 'What is a Power-Off Stall (Imminent & Full) and what phase of flight does it simulate? (ACS Area VII. Task B)',
        a: 'Simulates an accidental stall during the landing approach or flare. Power reduced to idle, flaps in landing config, pitch up until stall buffet/horn occurs. Recovery: reduce AOA, full power, level wings, retract flaps incrementally.'
      },
      {
        q: 'What is a Power-On Stall and what phase of flight does it simulate? (ACS Area VII. Task C)',
        a: 'Simulates a stall during takeoff, initial climbout, or go-around. Takeoff/climb power applied, pitch up smoothly to induce stall. Heavy right rudder required to counter torque/P-factor.'
      },
      {
        q: 'What is a Secondary Stall and what causes it?',
        a: 'Occurs after an initial stall recovery when the pilot pulls back on the yoke too abruptly before sufficient flying speed and airflow are re-established over the wings.'
      },
      {
        q: 'What is an Accelerated Stall and when can it occur?',
        a: 'A stall that occurs at a higher airspeed than normal unaccelerated stall speed due to increased load factor (e.g. steep turns, abrupt pull-ups).'
      },
      {
        q: 'What is a Cross-Control Stall and why is it dangerous in the traffic pattern?',
        a: 'Occurs when aileron deflection is applied in one direction and rudder in the opposite (skidding turn), commonly when overshooting final. Leads to rapid uncoordinated roll into an inverted spin at low altitude.'
      },
      {
        q: 'What is an Elevator Trim Stall and when is it most likely to occur?',
        a: 'Occurs during a full-power go-around from a trimmed landing approach if the pilot fails to apply forward elevator pressure to counteract strong nose-up pitch trim.'
      },
      {
        q: 'What is the spin recovery procedure (PARE)?',
        a: 'P - Power to Idle, A - Ailerons Neutral, R - Rudder Full Opposite to direction of rotation, E - Elevator Forward briskly to break the stall. Once rotation stops, neutralize rudder and recover smoothly from dive.'
      },
      {
        q: 'What are the four phases of a spin?',
        a: '1) Entry (aircraft stalls and yaws), 2) Incipient (first 2–4 turns as aerodynamic forces balance), 3) Developed (rotation rate, airspeed, and vertical speed stabilize), 4) Recovery (applying PARE to break spin).'
      },
      {
        q: 'What is the standard ACS tolerance for Steep Turns? (ACS Area V. Task A)',
        a: '45° bank angle (±5°), Altitude ±100 feet, Airspeed ±10 knots, Rollout heading ±10°.'
      },
      {
        q: 'What aerodynamic adjustments must be made during a 45° steep turn to maintain level flight?',
        a: 'Add back elevator pressure to increase vertical lift component, add a slight increase in throttle to counteract induced drag, and lead the rollout by approximately half the bank angle (20°–25°).'
      },
      {
        q: 'What is the objective of Ground Reference Maneuvers (Rectangular Course, S-Turns, Turns Around a Point)?',
        a: 'To maintain a constant ground track and constant altitude (600–1,000 ft AGL) while compensating for wind drift by varying bank angle.'
      },
      {
        q: 'In a Turn Around a Point or S-Turn, where is the bank angle the steepest and where is it the shallowest?',
        a: 'Steepest bank: Directly downwind (highest groundspeed). Shallowest bank: Directly upwind (lowest groundspeed).'
      },
      {
        q: 'What is a Forward Slip vs. a Side Slip?',
        a: 'Forward Slip: Used to lose altitude rapidly without increasing airspeed (longitudinal axis angled to flight path). Side Slip: Used in crosswind landings to align aircraft fuselage with the runway centerline.'
      },
      {
        q: 'What is the procedure for a Go-Around / Rejected Landing? (ACS Area IV. Task N)',
        a: '1) Apply full takeoff power immediately, 2) Establish pitch attitude for Vy climb, 3) Retract flaps incrementally to safe takeoff setting, 4) Accelerate through Vx/Vy, 5) Communicate go-around to ATC/traffic.'
      },
      {
        q: 'What is a Short-Field Takeoff and Landing technique?',
        a: 'Takeoff: Full power held on brakes before release, rotate at recommended Vr, climb at Vx until clearing 50-ft obstacle. Landing: Stabilized steep approach with full flaps at 1.3 Vso, touch down firmly on target mark, maximum braking.'
      },
      {
        q: 'What is a Soft-Field Takeoff and Landing technique?',
        a: 'Takeoff: Continuous rolling takeoff with full back pressure to keep nosewheel off mud/grass, level off in ground effect to accelerate to Vy. Landing: Keep nosewheel off the soft ground as long as possible with elevator back pressure.'
      }
    ]
  },

  // Topic 11: Emergency Procedures & Malfunctions (ACS Area IX) - 22 questions
  emergencies: {
    name: 'Emergency Procedures & Malfunctions',
    questions: [
      {
        q: 'What is the immediate action for an engine failure immediately after takeoff below 800 feet AGL?',
        a: 'Lower the nose immediately to establish best glide speed (Vg). Do NOT attempt the "impossible turn" back to the runway. Land straight ahead within a 30° arc of the departure heading.'
      },
      {
        q: 'What is the ABCDE checklist for an engine failure at cruising altitude?',
        a: 'A - Airspeed (pitch for Best Glide Vg), B - Best landing field (select and maneuver toward it), C - Checklist (fuel selector BOTH, fuel pump ON, mixture RICH, carb heat ON, magnetos BOTH), D - Declare emergency (121.5 MHz & squawk 7700), E - Emergency shutdown & passenger briefing.'
      },
      {
        q: 'What is the immediate action for an Engine Fire in Flight?',
        a: '1) Fuel Selector Valve - OFF, 2) Throttle - CLOSED, 3) Mixture - IDLE CUTOFF, 4) Cabin Heat and Defroster - OFF, 5) Establish steep emergency descent to blow out flames, 6) Execute forced landing.'
      },
      {
        q: 'What is the immediate action for an Electrical Fire in Flight?',
        a: '1) Master Switch - OFF, 2) Vents and Cabin Heat - CLOSED, 3) All avionics switches - OFF, 4) Use fire extinguisher if necessary, 5) Open fresh air vents only after fire is out, 6) Land at nearest airport.'
      },
      {
        q: 'What is the immediate action for a Wing Fire in Flight?',
        a: '1) Navigation/Strobe light switches - OFF, 2) Pitot Heat - OFF, 3) Perform a sideslip with the burning wing high to keep flames and hot gases away from the fuselage/fuel tank, 4) Land ASAP.'
      },
      {
        q: 'What should a pilot do if the Alternator/Generator warning light illuminates and the ammeter indicates a discharge?',
        a: '1) Check alternator circuit breaker (reset once if tripped), 2) Turn Alternator switch OFF and back ON to reset overvoltage relay. If charging is not restored, turn off all non-essential electrical equipment to conserve battery.'
      },
      {
        q: 'How long will a typical aircraft battery supply electrical power after alternator failure?',
        a: 'Approximately 30 to 45 minutes, depending on the battery health and electrical load shedding.'
      },
      {
        q: 'What procedure should be followed for a partial power loss in flight?',
        a: 'Maintain aircraft control, pitch for best glide, check carburetor heat (carb ice), switch fuel tanks, turn on auxiliary fuel pump, adjust mixture, and land at the nearest suitable airport.'
      },
      {
        q: 'What should a pilot do if high oil temperature is accompanied by a sudden drop in oil pressure?',
        a: 'Engine failure is imminent due to loss of oil. Reduce power to minimum necessary, maintain glide altitude, pick a landing site, and prepare for an immediate off-airport forced landing.'
      },
      {
        q: 'What action should be taken if an aircraft doorway opens in flight?',
        a: 'Fly the airplane first. Do not reach out. The door will only open a couple inches due to aerodynamics. If unable to close safely in flight, land at the nearest airport.'
      },
      {
        q: 'What is the Lost Communications procedure under VFR? (14 CFR 91.127/129)',
        a: '1) Set transponder to Squawk 7600, 2) Remain in VFR conditions, 3) Determine runway in use by watching traffic or airport windsock, 4) Enter traffic pattern and look for light gun signals from tower, 5) Acknowledge signals by rocking wings (day) or flashing landing light (night).'
      },
      {
        q: 'What is an Emergency Descent and when is it utilized? (ACS Area IX. Task A)',
        a: 'A maneuver to descend as rapidly as possible to a lower altitude or ground in case of structural fire, rapid depressurization, or smoke in cabin. Reduce power to idle, full flaps/gear if permitted, pitch for maximum allowable speed.'
      },
      {
        q: 'What is the difference between a Precautionary Landing and a Forced Landing?',
        a: 'Precautionary Landing: A premeditated landing on an airport or off-field when further flight is possible but inadvisable (worsening weather, fuel leak, illness). Forced Landing: An immediate landing forced by complete engine failure or uncontrollable fire.'
      },
      {
        q: 'What are the immediate actions if the throttle cable breaks and becomes stuck at full power?',
        a: 'Climb to a safe altitude near a suitable runway, configure for landing, turn off master/avionics if needed, and pull the mixture control to idle cutoff when landing is assured.'
      },
      {
        q: 'What should you do if an asymmetric/split flap condition occurs?',
        a: 'Immediately return the flap lever to the previous setting, apply opposite aileron and rudder to maintain level flight, avoid slow airspeeds, and fly a flapless approach.'
      },
      {
        q: 'What is the procedure if the primary flight display (PFD) or attitude indicator fails in flight?',
        a: 'Transition to backup/standby instruments (magnetic compass, turn coordinator, altimeter, GPS) and notify ATC for assistance.'
      },
      {
        q: 'What should you do if you encounter severe structural icing in an uncertified aircraft?',
        a: 'Immediately disengage autopilot, inform ATC, turn on pitot heat/defroster, turn around or climb/descend to exit icing air mass, avoid using full flaps on landing to prevent tailplane stall.'
      },
      {
        q: 'What is a Tailplane Stall caused by icing and how does its recovery differ from a wing stall?',
        a: 'Ice on the horizontal tailplane causes airflow separation, resulting in an uncommanded, violent pitch-DOWN. Recovery: Pull BACK on the yoke, retract flaps to previous setting, and reduce airspeed.'
      },
      {
        q: 'What is the proper action if the landing gear fails to extend in a retractable gear airplane?',
        a: 'Check landing gear circuit breaker, cycle gear switch, verify emergency gear extension instructions in POH, pull emergency gear extension release, check with tower or fly past for visual inspection.'
      },
      {
        q: 'What action should a pilot take if inadvertent entry into Instrument Meteorological Conditions (IMC) occurs?',
        a: 'Immediately transition to instruments, resist spatial disorientation, initiate a standard-rate 180° level turn back toward VMC, maintain altitude and airspeed, and contact ATC.'
      },
      {
        q: 'What is the minimum safe altitude for simulated engine failures during training flights? (14 CFR 91.119)',
        a: 'Simulated engine failure down to the surface must terminate no lower than 500 feet above the surface (or ground obstruction) unless over a designated landing runway.'
      },
      {
        q: 'What authority does the Pilot in Command have during an in-flight emergency? (14 CFR 91.3(b))',
        a: 'In an in-flight emergency requiring immediate action, the PIC may deviate from any rule of 14 CFR Part 91 to the extent required to meet that emergency.'
      }
    ]
  },

  // Topic 12: Checkride Oral & Flight Scenarios (ACS Practical Application) - 26 questions
  scenarios: {
    name: 'Checkride Scenarios & ADM',
    questions: [
      {
        q: 'Scenario: You are on final approach on a gusty day and suddenly encounter a 20-knot crosswind shear near touchdown. What is your action?',
        a: 'Maintain stabilized approach with wing-low side-slip or crab, add half the gust factor to approach speed, and execute an immediate go-around if the touchdown is not fully controlled and aligned.'
      },
      {
        q: 'Scenario: You are departing on a 150 NM cross-country and notice your alternator warning light turns on 15 minutes after takeoff. What do you do?',
        a: 'Check alternator circuit breaker; cycle master switch. If charging is not restored, turn around and land at your departure airport or nearest suitable airport while the battery still has power.'
      },
      {
        q: 'Scenario: During preflight, you discover a fuel tank cap has a torn O-ring gasket. You have a passenger waiting. What is your decision?',
        a: 'Do not fly. A damaged O-ring allows fuel siphoning and water contamination. The aircraft is not airworthy until the gasket is replaced and inspected.'
      },
      {
        q: 'Scenario: On a night VFR cross-country, your cockpit panel lights fail completely. What is your response?',
        a: 'Use your emergency flashlight (red or dim white), verify flight instruments, inform ATC, and divert to the nearest well-lit airport.'
      },
      {
        q: 'Scenario: You are taxiing toward Runway 28 and ATC says "Cessna 172SP, taxi to Runway 28 via Alpha." Can you cross intersecting Runway 19?',
        a: 'No! An ATC clearance to "taxi to" does not authorize crossing any runway along the taxi route. You must hold short and receive explicit clearance to cross Runway 19.'
      },
      {
        q: 'Scenario: You arrive at your destination airport and find fog has reduced visibility to 1/2 mile, below VFR minimums. What do you do?',
        a: 'Do not attempt to land. Hold in VMC if fuel permits and weather is improving rapidly, or divert immediately to your planned VFR alternate airport.'
      },
      {
        q: 'Scenario: You are flying at 8,500 ft MSL and a passenger begins complaining of a severe throbbing headache, dizziness, and blurred vision. What is your diagnosis and response?',
        a: 'Carbon Monoxide poisoning or hypoxia. Immediately turn off cabin heat, open all fresh air vents, use supplemental oxygen if available, and descend/land ASAP.'
      },
      {
        q: 'Scenario: During run-up, you notice the left magneto produces a 250 RPM drop (exceeding the 150 RPM POH limit) and engine runs rough. What do you do?',
        a: 'Attempt to clear fouled spark plugs by leaning mixture at high RPM for 30 seconds. If the mag drop still exceeds limits, return to the ramp. Do not fly.'
      },
      {
        q: 'Scenario: You are on cross-country and your GPS loses signal with a "RAIM Not Available" warning. How do you navigate?',
        a: 'Switch to pilotage, dead reckoning, and VOR navigation. Cross-check ground checkpoints on your sectional chart and notify ATC.'
      },
      {
        q: 'Scenario: You plan a flight to a mountain airport at 7,000 ft elevation on a 95°F day. How do you assess takeoff performance?',
        a: 'Calculate density altitude (exceeds 10,000 ft MSL). Check POH performance charts for takeoff distance and climb gradient. If safety margin is inadequate, delay flight until morning cooler temps.'
      },
      {
        q: 'Scenario: On short final, you see another aircraft pull onto the runway ahead of you without clearance. What do you do?',
        a: 'Initiate an immediate Go-Around: full power, climb at Vy, sidestep to the right if necessary to keep the runway traffic in sight, and broadcast go-around on tower/CTAF.'
      },
      {
        q: 'Scenario: You are flying VFR on top of a scattered cloud layer and notice clouds are rapidly merging into an unbroken solid overcast below you. What is your action?',
        a: 'Do not continue over solid overcast without an instrument rating. Turn 180° immediately toward open sky or find a hole while still in VFR to descend safely.'
      },
      {
        q: 'Scenario: During preflight inspection, you discover the anti-collision beacon light is inoperative. Can you legally fly Day VFR?',
        a: 'Check 91.205 and KOEL. If certified after March 11, 1996, anti-collision lights are required for Day VFR. If certified prior and not required by KOEL, deactivate and placard INOP.'
      },
      {
        q: 'Scenario: You are approaching a non-towered airport and hear another pilot announce they are on a 3-mile final for Runway 36 while you are downwind for Runway 18. What do you do?',
        a: 'Communicate with the other pilot on CTAF immediately, coordinate a common runway based on wind direction, or extend downwind/circle away to maintain separation.'
      },
      {
        q: 'Scenario: You are flying cross-country and your oil pressure gauge fluctuates erratically and drops toward zero, while oil temperature rises. What is your immediate decision?',
        a: 'Total engine failure is imminent. Declare emergency on 121.5 MHz (squawk 7700), select the nearest paved runway or open field, and prepare for a forced power-off landing.'
      },
      {
        q: 'Scenario: A friend offers to pay for the entire rental cost and fuel if you fly them to a weekend resort. Is this legal for a Private Pilot?',
        a: 'No. Under 14 CFR 61.113(c), you must pay at least your pro-rata (equal) share of fuel, oil, and rental fees. Accepting full payment is illegal compensation.'
      },
      {
        q: 'Scenario: You notice an Airworthiness Directive (AD) for your aircraft’s fuel selector valve requires inspection every 100 hours. The aircraft is at 102 hours since the last AD inspection. Can you fly solo?',
        a: 'No. AD compliance is mandatory under 14 CFR 39. Unlike a 100-hour inspection, an AD cannot exceed its compliance window unless explicitly allowed by the AD wording.'
      },
      {
        q: 'Scenario: You are entering a right traffic pattern designated for Runway 22. Why did the airport establish a right pattern?',
        a: 'To avoid local terrain, obstructions, residential noise-sensitive areas, or conflicting airspace from an adjacent airport on the left side.'
      },
      {
        q: 'Scenario: You take off from a sea-level airport and fly directly toward a high-elevation ridge. You notice your Vertical Speed Indicator reads 0 fpm despite full throttle climb attitude. Why?',
        a: 'High density altitude combined with mountain downdrafts. Turn away from rising terrain toward lower valley ground before airspeed decays into a stall.'
      },
      {
        q: 'Scenario: You are on short final and notice a sudden gust has blown the windsock 90° across the runway, indicating a 15-knot direct crosswind. Your airplane maximum demonstrated crosswind is 15 knots. What should you do?',
        a: 'Evaluate proficiency and runway conditions. If unable to maintain alignment and touchdown on upwind wheel with full control authority, execute a go-around and divert to a runway aligned with the wind.'
      },
      {
        q: 'Scenario: You are cruising in Class E airspace at 5,500 ft MSL and encounter a military jet flying in close formation next to you, rocking its wings. What does this mean?',
        a: 'You have entered restricted/intercept airspace and are being intercepted. Rock wings, follow the interceptor aircraft, squawk 7700, and monitor 121.5 MHz.'
      },
      {
        q: 'Scenario: While practicing maneuvers, you accidentally enter an unintended spin. What steps do you take without hesitation?',
        a: 'Power to IDLE, Ailerons NEUTRAL, Rudder FULL OPPOSITE spin direction, Elevator FORWARD briskly. Once rotation stops, neutralize rudder and pull up smoothly from the dive.'
      },
      {
        q: 'Scenario: You are on downwind in the traffic pattern and smell burning electrical insulation, with smoke coming from beneath the glare shield. What is your priority action?',
        a: 'Master switch OFF immediately, close all cabin vents and heat, inform tower/CTAF if possible before electrical shutoff, and land immediately.'
      },
      {
        q: 'Scenario: You are landing on a wet asphalt runway and upon applying brakes, the aircraft begins to skid uncontrollably with no deceleration. What is happening and what do you do?',
        a: 'Dynamic hydroplaning. Release the brakes immediately to allow tires to spin up and regain traction, maintain directional control with rudder, and apply gentle aerodynamic braking.'
      },
      {
        q: 'Scenario: You have not flown in 11 months and want to take your family on a daytime VFR flight. What must you accomplish before the flight?',
        a: '1) Verify valid Medical / BasicMed, 2) Verify Flight Review within 24 calendar months, 3) Perform at least 3 takeoffs and landings in the same category/class within the preceding 90 days.'
      },
      {
        q: 'Scenario: Your checkride examiner asks you to calculate whether your airplane can safely clear a 50-ft tree on a 2,000-ft grass runway at 85°F. What resources do you use?',
        a: 'POH Section 5 Performance Charts: Short-Field Takeoff Distance Over 50-ft Obstacle, applying grass surface factor (+15% or POH specified adjustment), density altitude, and weight.'
      }
    ]
  }
};

// Count total questions
let totalQuestions = 0;
const categoryDefinitions = [];

for (const [key, topic] of Object.entries(questionsData)) {
  totalQuestions += topic.questions.length;
  categoryDefinitions.push({
    name: topic.name,
    questions: topic.questions
  });
}

console.log(`Generated ${categoryDefinitions.length} topics with ${totalQuestions} total questions!`);

// Let's verify all questions have valid q and a
let index = 0;
categoryDefinitions.forEach(cat => {
  console.log(`- ${cat.name}: ${cat.questions.length} questions`);
  cat.questions.forEach(q => {
    index++;
    if (!q.q || !q.a) {
      console.error(`Error in question #${index}: missing q or a`);
    }
  });
});

// Let's read the current app.js up to categoryDefinitions
const currentAppJs = fs.readFileSync('app.js', 'utf8');

// Separate the scenario questions (or merge them cleanly into the categories structure)
// We will also keep scenarioQuestions for backwards compatibility if needed
const scenarios = questionsData.scenarios.questions.map(q => ({ q: q.q, a: q.a }));

const appJsHeader = `const STORAGE_KEY = 'flight-checkride-flashcards';
const STATS_KEY = 'flight-checkride-stats';
const REMINDERS_KEY = 'flight-checkride-reminders';

const scenarioQuestions = ${JSON.stringify(scenarios, null, 2)};

const categoryDefinitions = ${JSON.stringify(categoryDefinitions, null, 2)};
`;

// Extract the rest of app.js after categoryDefinitions
const stateStartIndex = currentAppJs.indexOf('// App State');
if (stateStartIndex === -1) {
  console.error('Could not find // App State in app.js');
  process.exit(1);
}

const appJsTail = currentAppJs.substring(stateStartIndex);
const newAppJs = appJsHeader + '\n' + appJsTail;

fs.writeFileSync('app.js', newAppJs, 'utf8');
fs.writeFileSync('FlightFlashCardsAndroid/app/src/main/assets/app.js', newAppJs, 'utf8');
console.log('Successfully wrote app.js and Android assets app.js!');
