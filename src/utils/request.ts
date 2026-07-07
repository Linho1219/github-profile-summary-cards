import * as core from '@actions/core';
import * as rax from 'retry-axios';
import axios, {AxiosPromise} from 'axios';

rax.attach();

export default function request(header: any, data: any): AxiosPromise<any> {
    return axios('https://api.github.com/graphql', {
        method: 'post',
        headers: header,
        data: data,
        raxConfig: {
            retry: 3,
            retryDelay: 1000,
            backoffType: 'linear',
            httpMethodsToRetry: ['POST'],
            onRetryAttempt: async err => {
                const cfg = rax.getConfig(err);
                core.warning(err);
                core.warning(`Retry attempt #${cfg?.currentRetryAttempt}`);
            }
        }
    });
}
