export type EvidenceStatus = "no-evidence" | "under-review"
export type EvidenceFileType = "pdf" | "image"

export interface SDGIndicator {
  id: string
  title: string
  /** Google Drive link to the evidence. Several indicators may share one document. */
  link?: string
  /** Set when there is no link, to explain why. */
  status?: EvidenceStatus
  /** Defaults to "pdf". */
  fileType?: EvidenceFileType
}

export interface SDGTarget {
  id: string
  title?: string
  indicators: SDGIndicator[]
}

export interface SDG {
  id: string
  number: number
  title: string
  /** T.I.P.'s commitment statement for this goal. */
  statement: string
  targets: SDGTarget[]
}

export const evidenceStatusLabels: Record<EvidenceStatus, string> = {
  "no-evidence": "No evidence published",
  "under-review": "Evidence being updated",
}

const toId = (code: string) => `sdg-${code.replace(/\./g, "-")}`
const driveLink = (fileId: string) => `https://drive.google.com/file/d/${fileId}/view`

/** An indicator with published evidence. */
const doc = (code: string, name: string, fileId: string, fileType?: EvidenceFileType): SDGIndicator => ({
  id: toId(code),
  title: `${code} ${name}`,
  link: driveLink(fileId),
  ...(fileType ? { fileType } : {}),
})

/** An indicator with published evidence stored as an image. */
const img = (code: string, name: string, fileId: string): SDGIndicator => doc(code, name, fileId, "image")

/** An indicator with no evidence listed in the source. */
const none = (code: string, name: string): SDGIndicator => ({
  id: toId(code),
  title: `${code} ${name}`,
  status: "no-evidence",
})

/** An indicator whose evidence is being corrected by its owner. */
const review = (code: string, name: string): SDGIndicator => ({
  id: toId(code),
  title: `${code} ${name}`,
  status: "under-review",
})

const target = (code: string, title: string, indicators: SDGIndicator[]): SDGTarget => ({
  id: toId(code),
  title,
  indicators,
})

export const sdgData: SDG[] = [
  {
    id: "sdg-1",
    number: 1,
    title: "No Poverty",
    statement:
      "T.I.P. commits to breaking the cycle of poverty by expanding scholarship and financial assistance programs, strengthening industry linkages for employability, and supporting community livelihood and technology-transfer projects.",
    targets: [],
  },
  {
    id: "sdg-2",
    number: 2,
    title: "Zero Hunger",
    statement:
      "T.I.P. pledges to support food security initiatives through agricultural engineering innovations, community gardens, food technology research, and partnerships that promote sustainable food production and responsible consumption.",
    targets: [
      target("2.1", "2.1 Research on hunger", [
        none("2.1.1", "Zero Hunger: CiteScore"),
        none("2.1.2", "Zero Hunger: FWCI"),
        none("2.1.3", "Zero Hunger: publications"),
      ]),
      target("2.2", "2.2 Campus food waste", [
        doc("2.2.1", "Campus food waste tracking", "1ZBgcCjVkGqnDl5Ejg57YY25GSiYvwi-J"),
        doc("2.2.2", "Campus food waste", "1JNW29QkjHimp1Rob-jZ3bSG6l_HgUMWi"),
      ]),
      target("2.3", "2.3 Student hunger", [
        none("2.3.1", "Student food insecurity and hunger"),
        none("2.3.2", "Students hunger interventions"),
        doc("2.3.3", "Sustainable food choices on campus", "16I_uT5pBTW2DPi__dpCRsGiB_8f9_2UI"),
        doc("2.3.4", "Healthy and affordable food choices", "1HcG315JrMgSVEiCQcj1SOYOFBOmo9l4T"),
        doc("2.3.5", "Staff hunger interventions", "12oMfKP8ImHKQdOtnzBg14FYknC9trLKH"),
      ]),
      target("2.4", "2.4 Proportion of graduates in agriculture and aquaculture including sustainability aspects", [
        none("2.4.1", "Proportion of graduates in agriculture and aquaculture"),
      ]),
      target("2.5", "2.5 National hunger", [
        doc("2.5.1", "Access to food security knowledge", "1o9W9EPCxexceLXyjhq2QeOC3NL-2i8Am"),
        doc("2.5.2", "Events for local farmers and food producers", "1-tXxqcct9f2MNkegDnxryDODKtsbGPGd"),
        review("2.5.3", "University access to local farmers and food producers"),
        doc("2.5.4", "Sustainable food purchases", "1DPqpDybg-Mmlu6P_CR5pz4DhnI6vArxM"),
      ]),
    ],
  },
  {
    id: "sdg-3",
    number: 3,
    title: "Good Health and Well-Being",
    statement:
      "T.I.P. ensures a safe, healthy, and inclusive environment for students and employees by maintaining high standards of laboratory and workplace safety, providing mental health support, and promoting health through campus activities.",
    targets: [
      target("3.1", "3.1 Research on health and well-being", [
        doc("3.1.1", "Good Health and Well-being: paper views", "1dg06j7RygQYO56ySffSKfvmGLNwwgPsc"),
        doc("3.1.2", "Clinical citations", "1NDKog7UIIygsAYLoFB_6aQV_8-XVZOsi"),
        doc("3.1.3", "Good Health and Well-being: publications", "1Qq-VPvjcDj_FJY1Wu27Jlczv7fszTKBo"),
      ]),
      target("3.2", "3.2 Number graduating in health professions", [
        doc("3.2.1", "Indicator: Proportion of graduates in health professions Year: 2024", "1NYuuNSItSjTKtKvrv3okiQqdOxXJix_8"),
      ]),
      target("3.3", "3.3 Collaborations and health services", [
        doc("3.3.1", "Current collaborations with health institutions", "1pTY1YpKHapBVzcPP4bOq1MFKEX9S8sXV"),
        doc("3.3.2", "Health outreach programmes", "1OZ6YQgpVQfTB6oAGEZucK7OE_td8i5so"),
        doc("3.3.3", "Shared sports facilities", "14XnbKTqYxXHsRq74878ABJvyXKhQLa2k"),
        doc("3.3.4", "Sexual and reproductive health care services for students", "17hC6kXgDF-xeJNxF_geXurF8dfRcHuSw"),
        doc("3.3.5", "Mental health support for students", "1bfP8-YjoQOLlFkUF7VIkeFJX1ntBG91i"),
        doc("3.3.6", "Smoke-free policy", "1o0hReQj5wFlyoLfzzWO_fc3Emqw4BhcX"),
        doc("3.3.7", "Mental Health Support for Staff", "1No-MjqC9p3hVpTP5nro7oLdWNl4Q-Aeb"),
      ]),
    ],
  },
  {
    id: "sdg-4",
    number: 4,
    title: "Quality Education",
    statement:
      "T.I.P. upholds its mission to transform students into globally competitive professionals through outcomes-based education, continuous faculty development, research integration, and lifelong learning opportunities.",
    targets: [
      target("4.1", "4.1 Research on early years and lifelong learning education", [
        doc("4.1.1", "Quality Education: paper views", "191Klby7bYmauZgDVHcP_P6fiJkZgzzpe"),
        doc("4.1.2", "Quality Education: CiteScore", "191Klby7bYmauZgDVHcP_P6fiJkZgzzpe"),
        doc("4.1.3", "Quality Education: publications", "191Klby7bYmauZgDVHcP_P6fiJkZgzzpe"),
      ]),
      target("4.2", "4.2 Proportion of graduates with teaching qualification", [
        none("4.2.1", "Proportion of graduates with relevant qualification for teaching"),
      ]),
      target("4.3", "4.3 Lifelong learning measures", [
        doc("4.3.1", "Public resources (lifelong learning)", "1MMj8Qk9fq_ZYPwtAF3fOWbdUE3Xu0hAn"),
        doc("4.3.2", "Public events (lifelong learning)", "1C9_YPWLhSBo5F4EkdvROitXGMwKPlNuM"),
        doc("4.3.3", "Vocational training events (lifelong learning)", "1HIXmDL18jrecsJVB_KdnOcdFV0Fb4RSd"),
        doc("4.3.4", "Education outreach activities beyond campus", "1bab-HyN04rYb7jVgK7PaDRoqmGU0NxoW"),
        doc("4.3.5", "Lifelong learning access policy", "1zFpvUcU-r_rz-zxcaIqcv9yGtMtMn39X"),
      ]),
      target("4.4", "4.4 Proportion of first-generation students", [
        doc("4.4.1", "Proportion of first-generation students", "17vMtmeKP8fJ86mXy-OdlvNuTqciBA2qN"),
      ]),
    ],
  },
  {
    id: "sdg-5",
    number: 5,
    title: "Gender Equality",
    statement:
      "T.I.P. promotes an equitable learning and working environment where all genders have equal access to education, leadership, and advancement opportunities, ensuring policies that eliminate discrimination and harassment.",
    targets: [],
  },
  {
    id: "sdg-6",
    number: 6,
    title: "Clean Water and Sanitation",
    statement:
      "T.I.P. commits to ensuring access to safe and potable water across all campuses, maintaining proper sanitation facilities, and promoting water conservation through sustainable plumbing, wastewater management, and educational initiatives for students.",
    targets: [
      target("6.1", "", [
        doc("6.1.3", "Clean Water and Sanitation: publications", "1mrfNS-R0bbLX3mV4rSoV3U4AaEcXy3X5"),
      ]),
      target("6.2", "", [
        doc("6.2.1", "Water consumption tracking", "17rY_iDpz2O2XxMkCLbpemctMAs4zGZAP"),
        doc("6.2.2", "Water consumption per person", "19nEF9yNGV-NDz67akDrbuZUJTaDjrIsK"),
      ]),
      target("6.3", "6.3 Water usage and care", [
        doc("6.3.1", "Wastewater treatment", "1bSFSbHlPTSogUjZODw9MNBaI6q_yWcrn"),
        doc("6.3.3", "Free drinking water provided", "1oRwOU6xcY3VdLaq1Zs4B3OR3Er9Su7Vq"),
        doc("6.3.4", "Water-conscious building standards", "1WRQn73f89NKoBbBe0WdK4wmLwRxawasf"),
        doc("6.3.5", "Water-conscious planting", "1TUdt-wZBBogwnLsFsPAZ8EJUf4azb4yS"),
      ]),
      target("6.5", "6.5 Water in the community", [
        doc("6.5.1", "Water management educational opportunities", "1xAz4trysMfc1Z31MFHFFGHu5xnwPAGcu"),
        doc("6.5.3", "Off campus water conservation support", "1fj_vGwLbowz4QOKv00w3ux67VEevl6lq"),
        doc("6.5.4", "Sustainable water extraction on campus", "1t2iH_6_xAxJrAoHUllRscyiqLHtGRJvh"),
        doc("6.5.5", "Cooperation on water security", "1Ta1u4zAAeppGCEWC7ZBTJO0NlP7-cP8b"),
        doc("6.5.6", "Promoting conscious water usage on campus", "1b5v59CJvKCVQ5w43cfJbfKYOvFT0J5Ro"),
        doc("6.5.7", "Promoting conscious water usage in the wider community", "1ouU0iQRdnsyGogqu1rxsiJ7ZSbqxJgdi"),
      ]),
    ],
  },
  {
    id: "sdg-7",
    number: 7,
    title: "Affordable and Clean Energy",
    statement:
      "T.I.P. pledges to advance the transition toward 100% renewable energy use beyond campus operations while continuously improving energy efficiency across its laboratories, buildings, and offices. Guided by the Philippines’ Renewable Energy Act of 2008 and UN Sustainable Development Goal 7 (Affordable and Clean Energy), T.I.P. commits to integrating clean energy and sustainable practices in its operations, curriculum, research, and community partnerships. Through sustained advocacy, education, and innovation, T.I.P. reaffirms its role as a catalyst for the nation’s clean energy transformation and a model for sustainability in higher education.",
    targets: [
      target("7.1", "7.1 Research on clean energy", [
        doc("7.1.1", "Affordable and Clean Energy: CiteScore", "1cFFGLBuvITG0ViiO9zAEp9mWOEHgnhfm"),
        doc("7.1.2", "Affordable and Clean Energy: FWCI", "1cFFGLBuvITG0ViiO9zAEp9mWOEHgnhfm"),
        doc("7.1.3", "Affordable and Clean Energy: publications", "1cFFGLBuvITG0ViiO9zAEp9mWOEHgnhfm"),
      ]),
      target("7.2", "7.2 University measures towards affordable and clean energy", [
        review("7.2.1", "Energy-efficient renovation and building"),
        review("7.2.2", "Upgrade buildings to higher energy efficiency"),
        review("7.2.3", "Carbon reduction and emission reduction process"),
        review("7.2.4", "Plan to reduce energy consumption"),
        review("7.2.5", "Energy wastage identification"),
        review("7.2.6", "Divestment policy"),
      ]),
      target("7.3", "7.3 Energy use density", [
        doc("7.3.1", "Energy usage per sqm", "1LuaTNdhm2nW4mq2wF8ce_Eln7IltxxSM"),
      ]),
      target("7.4", "7.4 Energy and the community", [
        doc("7.4.1", "Local community outreach for energy efficiency", "1-MLH9F1Ww8QQ1c0H0wEEPh7VSER8lmDA"),
        doc("7.4.2", "100% renewable energy pledge", "1jGFqj-I0EYl--F0vTjyBVYtBs31a_6fZ"),
        doc("7.4.3", "Energy efficiency services for industry", "1uC2q2jH_SLhwH3W7qZ2JNzk2YIulJ3N7"),
        doc("7.4.4", "Policy development for clean energy technology", "1Dp6eHaIBfYdBrH8G7u9RYe6I9u_ZSoml"),
        doc("7.4.5", "Assistance to low-carbon innovation", "1XJpv-KEVE2aKqXdnBrthI5hPxu3BaWp1"),
      ]),
      target("7.5", "7.5 Low-carbon energy use", [
        doc("7.5.1", "Low-carbon energy use", "1HWtYt3Ydkkl1uaOFxRwSWT4SXgNoSjAH"),
      ]),
    ],
  },
  {
    id: "sdg-8",
    number: 8,
    title: "Decent Work and Economic Growth",
    statement:
      "T.I.P. supports fair and safe employment practices for faculty and staff, promotes entrepreneurship and innovation among students, and fosters partnerships with industry that lead to meaningful work and inclusive economic opportunities.",
    // 8.3.1 (Expenditure per employee) is intentionally not published.
    targets: [
      target("8.1", "", [
        doc("8.1.2", "Decent Work and Economic Growth: publications", "1ZfxY3VFvNuuYuqmuqreh5erGkYmCA1jT"),
      ]),
      target("8.2", "8.2 Employment practice", [
        doc("8.2.1", "Employment practice living wage", "1yTg7g0W-XbrZGs-r1t2CLxlTqbIc-_TE"),
        doc("8.2.2", "Employment practice unions", "1fu4jXLUnrWTCzp17hfmbh6ZSiXAGzcBz"),
        doc("8.2.3", "Employment policy on discrimination", "1EFN3DL0HABsPCV1bLiuuNJ_SJZ3BvB4D"),
        doc("8.2.4", "Employment policy modern slavery", "12O4tert0d_4AHJsNSUW45EIyGZL9xLPB"),
        doc("8.2.5", "Employment practice equivalent rights outsourcing", "1ebjkG0Ci728-Ovg6BXepf45_NBFlJDvT"),
        doc("8.2.6", "Employment policy pay scale equity", "1HKbtnyIcuz45wfxL1VzordSoSFiMHUXr"),
        doc("8.2.7", "Tracking pay scale for gender equity", "1d39vheu4JuHhQU0XM-Z6DNYAV-Zp_Vgl"),
        doc("8.2.8", "Employment practice appeal process", "12WIKrFFE1jsbAD-38o8Z8ilqDMBvv8kU"),
        doc("8.2.9", "Employment practice labour rights", "16rHUxAfjygTrv9NQMC4XqusiU_yW2SCK"),
      ]),
      target("8.4", "8.4 Proportion of students taking work placements", [
        review("8.4.1", "Proportion of students with work placements"),
      ]),
      target("8.5", "8.5 Proportion of employees on secure contracts", [
        doc("8.5.1", "Proportion of employees on secure contracts", "1Z11sSgjACPIuOB3SVZ0JXOwSC-oDN81v"),
      ]),
    ],
  },
  {
    id: "sdg-9",
    number: 9,
    title: "Industry, Innovation and Infrastructure",
    statement:
      "T.I.P. commits to strengthening its Technopreneurship and Collaborative Research (TechnoCoRe) programs, developing innovative and sustainable laboratories, and driving innovation that supports resilient infrastructure and responsible industrial growth.",
    targets: [
      target("9.1", "", [
        doc("9.1.1", "Industry, Innovation and Infrastructure: publications", "1H4eMeWrCV1n5yD-etx_Uav4k78iNepDy"),
      ]),
      target("9.2", "", [
        doc("9.2.1", "Number of patents citing research", "1eZlUygiMhXhl-xys_FQ2RT50NvUz7G-R"),
      ]),
    ],
  },
  {
    id: "sdg-10",
    number: 10,
    title: "Reduced Inequalities",
    statement:
      "T.I.P. ensures that education and institutional services are accessible to all regardless of background, and promotes inclusivity through scholarships, accessible facilities, and equal opportunities in learning and employment.",
    targets: [],
  },
  {
    id: "sdg-11",
    number: 11,
    title: "Sustainable Cities and Communities",
    statement:
      "T.I.P. pledges to make its campuses models of sustainability through green building initiatives, safe learning environments, disaster resilience planning, and community engagement in sustainable urban development.",
    targets: [
      target("11.1", "", [
        doc("11.1.2", "Sustainable Cities and Communities: FWCI", "1gOC2LuAOLIO-aqjIrxRlt-3PFgag_ykt"),
      ]),
      target("11.2", "", [
        doc("11.2.3", "Public access to museums", "1jNvwFqdE3dApmfgxLeU84tjaAgskj1VV"),
        review("11.2.5", "Arts and heritage contribution"),
      ]),
      target("11.4", "", [
        doc("11.4.6", "Pedestrian priority on campus", "1o-V1PyVW6eIbwIuw2ny-0j-jEgolKLf-"),
      ]),
    ],
  },
  {
    id: "sdg-12",
    number: 12,
    title: "Responsible Consumption and Production",
    statement:
      "T.I.P. commits to responsible classroom and office operations by implementing proper waste management, sustainable procurement, and equipment lifecycle management while promoting resource efficiency and environmental consciousness.",
    targets: [],
  },
  {
    id: "sdg-13",
    number: 13,
    title: "Climate Action",
    statement:
      "T.I.P. pledges to reduce its environmental impact through energy conservation, greening initiatives, and climate education, while integrating disaster risk reduction and climate resilience into its institutional operations and curricula.",
    targets: [
      target("13.1", "13.1 Research on climate action", [
        doc("13.1.1", "Climate Action: CiteScore", "1ChUuRAdEaEYrSg6OUNCtISdxoxZJv8nz"),
        doc("13.1.2", "Climate Action: FWCI (Field-Weighted Citation Impact)", "1ChUuRAdEaEYrSg6OUNCtISdxoxZJv8nz"),
        doc("13.1.3", "Climate Action: publications", "1ChUuRAdEaEYrSg6OUNCtISdxoxZJv8nz"),
      ]),
      target("13.2", "13.2 Low-carbon energy use", [
        review("13.2.1", "Low-carbon energy tracking"),
        review("13.2.2", "Low-carbon energy use"),
      ]),
      target("13.3", "13.3 Environmental education measures", [
        review("13.3.1", "Local education programs on climate"),
        doc("13.3.2", "Climate Action Plan, shared", "19RzLEy30gHI2phrrKenC1ech7vrTLpB7"),
        doc("13.3.3", "Co-operative planning for climate change disasters", "1t0p_SCrBy7DUWYUJALB4PhIGXvOJFkfr"),
        none("13.3.4", "Inform and support government"),
        none("13.3.5", "Environmental education collaborate with NGO"),
      ]),
      target("13.4", "13.4 Commitment to carbon neutral university", [
        none("13.4.1", "Commitment to carbon neutral university"),
        none("13.4.2", "Achieve by date"),
      ]),
    ],
  },
  {
    id: "sdg-14",
    number: 14,
    title: "Life Below Water",
    statement:
      "T.I.P. supports initiatives for water conservation, pollution prevention, and research that protect marine and freshwater ecosystems, especially in communities affected by environmental degradation and industrial waste.",
    targets: [
      target("14.1", "14.1 Research on life below water", [
        img("14.1.1", "Life Below Water: CiteScore", "1cYumw_I16h1Ddqoi4u-6TKvGpFYDKXDL"),
        img("14.1.2", "Life Below Water: FWCI (Field-Weighted Citation Impact)", "1cYumw_I16h1Ddqoi4u-6TKvGpFYDKXDL"),
        img("14.1.3", "Life Below Water: publications", "1cYumw_I16h1Ddqoi4u-6TKvGpFYDKXDL"),
      ]),
      target("14.2", "14.2 Supporting aquatic ecosystems through education", [
        img("14.2.1", "Fresh-water ecosystems (community outreach)", "1wFSwY8jCTrCEwZhEBsccxWVnsPtjyakI"),
        img("14.2.2", "Sustainable fisheries (community outreach)", "1rHbfOMS3LOiSlKG-YzfFVE-wBibPPsTp"),
        none("14.2.3", "Overfishing (community outreach)"),
      ]),
      target("14.3", "14.3 Supporting aquatic ecosystems through action", [
        img("14.3.1", "Conservation and sustainable utilisation of the oceans (events)", "1iQz6RuxAzrNgwfLTN2Fsnt8J1-SH12Ho"),
        none("14.3.2", "Food from aquatic ecosystems (policies)"),
        img("14.3.3", "Maintain ecosystems and their biodiversity (direct work)", "1L8LKFw8kBaUas_ca9CeBNoJTWBwr-nDr"),
        img("14.3.4", "Technologies towards aquatic ecosystem damage prevention (direct work)", "1nuarvr03v3kiIvMuOWJ94EWS7v7cevP8"),
      ]),
      target("14.4", "14.4 Water sensitive waste disposal", [
        img("14.4.1", "Water discharge guidelines and standards", "1ECkB4SDv8NhH-LVDJGkM-XM2Yq5AQlGI"),
        img("14.4.2", "Action plan to reducing plastic waste", "1pg11iZX0dUXFNevTNuIU8zrX0DBTYRsA"),
        img("14.4.3", "Reducing marine pollution (policy)", "17E0mO-DV1SpFZfcDM3qAp-GfQ-ExGAHS"),
      ]),
      target("14.5", "14.5 Maintaining a local ecosystem", [
        none("14.5.1", "Minimizing alteration of aquatic ecosystems (plan)"),
        none("14.5.2", "Monitoring the health of aquatic ecosystems"),
        review("14.5.3", "Programmes towards good aquatic stewardship practices"),
        img("14.5.4", "Collaboration for shared aquatic ecosystems", "1zcajeILjvzWiyroxff3y4K7JrQYPrjOP"),
        img("14.5.5", "Watershed management strategy", "1l_ESTMMbsvJDl3CFMPmwsyH8Cd8_UO-R"),
      ]),
    ],
  },
  {
    id: "sdg-15",
    number: 15,
    title: "Life on Land",
    statement:
      "T.I.P. commits to promoting biodiversity conservation and sustainable landscaping within its campuses through tree planting, green spaces, and environmental awareness programs that foster ecological responsibility.",
    targets: [],
  },
  {
    id: "sdg-16",
    number: 16,
    title: "Peace, Justice and Strong Institutions",
    statement:
      "T.I.P. upholds transparency, accountability, and ethical governance in all its institutional processes, fostering a culture of peace, integrity, and responsible citizenship among students and employees.",
    targets: [
      target("16.1", "16.1 Research on peace and justice", [
        none("16.1.1", "Peace, Justice and Strong Institutions: CiteScore"),
        none("16.1.2", "Peace, Justice and Strong Institutions: FWCI"),
        none("16.1.3", "Peace, Justice and Strong Institutions: publications"),
      ]),
      target("16.2", "16.2 University governance measures", [
        none("16.2.1", "Elected representation"),
        doc("16.2.2", "Students' union", "1izqu-ZfNQrlTx9eJL5b4dbi2fpab_awg"),
        doc("16.2.3", "Identify and engage with local stakeholders", "1dP-hmsFa3eETzwtcLgi_SrV-X1FG2kPG"),
        doc("16.2.4", "Participatory bodies for stakeholder engagement", "1jp9w0n9DjqYbDbhbH8nYkx7w4yYUrbT8"),
        doc("16.2.5", "University principles on bribery and corruption", "1cbCJvggIGJXDuV7ko86gECpFRjIefvvD"),
        doc("16.2.6", "Academic freedom policy", "1uCUh16K-1dTTOA7pw_nQKX50RWgYQjts"),
        none("16.2.7", "Publish financial data"),
      ]),
      target("16.3", "16.3 Working with government", [
        none("16.3.1", "Provide expert advice with government"),
        none("16.3.2", "Policy and lawmakers outreach and education"),
        none("16.3.3", "Participation in government research"),
        none("16.3.4", "Neutral platform to discuss issues"),
      ]),
      target("16.4", "16.4 Proportion of graduates in civil and law enforcement", [
        none("16.4.1", "Proportion of graduates in law"),
      ]),
    ],
  },
  {
    id: "sdg-17",
    number: 17,
    title: "Partnerships for the Goals",
    statement:
      "T.I.P. pledges to strengthen collaborations with industry, academe, government, and international partners to advance research, education, and outreach initiatives that accelerate the achievement of the SDGs.",
    targets: [
      target("17.2", "17.2 Relationships to support the goals", [
        doc("17.2.1", "Relationships with regional NGOs and government for SDG policy", "17iwYEuJncG1jNKRKRIqrW-_Si-UlJs4T"),
        doc("17.2.2", "Cross sectoral dialogue about SDGs", "1tQ9ekzrPX9E6JlHLRZYMP-NFGOUsRB0g"),
        doc("17.2.3", "International collaboration data gathering for SDG", "1Rx5-dmm4KLEKU-4s8qFHZ96OwyzaYSoH"),
        doc("17.2.4", "Collaboration for SDG best practice", "1BcCr3AU7BzMtCMnoRdBEWmksMyF7a20A"),
        doc("17.2.5", "Collaboration with NGOs for SDGs", "1hpw2c4QqX70VhL3mBB1xf_Dx7dlLhpnG"),
      ]),
      target("17.3", "", [
        review("17.3.1", "to 17.3.17 Publication of SDG reports - per SDG"),
      ]),
      target("17.4", "17.4 Education for the SDGs", [
        doc("17.4.1", "Education for SDGs commitment to meaningful education", "1JSBlKZ-ujThNkzGfAPF9QbJRtxe3xAhs"),
        doc("17.4.2", "Education for SDGs: specific courses on sustainability", "1-2ui21RfaZlvP37-mppCzaQWgNnRgkUG"),
        doc("17.4.3", "Education for SDGs in the wider community", "1dRsi7g4xxzDAoerHlfHhvu_5br__l9F7"),
      ]),
    ],
  },
]
