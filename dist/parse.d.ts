type FailureExample = {
    example: string;
    description: string;
    message: string;
};
export type RspecResult = {
    examples: FailureExample[];
    summary: string;
    success: boolean;
};
export declare function parse(resultPath: string): RspecResult;
export {};
