// stage-config.js

export const stageConfigs = {
    stage1: {
        visibilityRange: { u: { min: 0.49, max: 0.5 }, v: { min: 0.4, max: 0.6 } }
    },
    stage2: {
        visibilityRange: { u: { min: 0.4, max: 0.6 }, v: { min: 0.3, max: 0.7 } }
    },
    // Add more stages as needed
};

export const initialStage = 'stage1';