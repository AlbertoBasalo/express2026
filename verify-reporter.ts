import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { mkdirSync, writeFileSync } from 'fs';

interface FailedTest {
  title: string;
  file: string;
  error: string;
  trace?: string;
}

interface PassedTest {
  title: string;
  file: string;
}

const REPORT_DIR = 'project/reports';

export default class FailedTestsReporter implements Reporter {
  private failedTests: FailedTest[] = [];
  private passedTests: PassedTest[] = [];

  private stripANSI(text: string): string {
    // Remove ANSI escape sequences (color codes, formatting, etc.)
    return text.replace(/\x1b\[\d+m/g, '').replace(/\[\d+m/g, '');
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'failed' || result.status === 'timedOut') {
      const error = result.error?.message || 'Unknown error';
      const trace = result.error?.stack || '';

      this.failedTests.push({
        title: test.title,
        file: test.location.file,
        error: this.stripANSI(error),
        trace: this.stripANSI(trace),
      });
    } else {
      this.passedTests.push({
        title: test.title,
        file: test.location.file,
      });
    }
  }

  async onEnd(): Promise<void> {
    mkdirSync(REPORT_DIR, { recursive: true });

    let markdown = `# Test Report\n\n`;
    markdown += `**Generated:** ${new Date().toISOString()}\n\n`;
    // total tests = passed + failed
    const totalTests = this.passedTests.length + this.failedTests.length;
    markdown += `**Total Tests:** ${totalTests}\n\n`;
    // if no test run show message and exit
    if (totalTests === 0) {
      markdown += `☣️ No tests were executed.\n`;
      writeFileSync(`${REPORT_DIR}/verify.report.md`, markdown);
      console.log('\n☣️  No tests were executed.');
      return;
    }
    markdown += `**Status:** ${this.failedTests.length === 0 ? '✅ All tests passed' : `❌ ${this.failedTests.length} test(s) failed`}\n\n`;
    const mdOpen = '```md';
    const mdClose = '```';
    if (this.failedTests.length > 0) {
      markdown += `## Failed Tests\n\n`;
      this.failedTests.forEach((test, index) => {
        markdown += `### ${index + 1}. ${test.title}\n`;
        markdown += `**File:** \`${test.file}\`\n`;
        markdown += `**Error:**\n\n${mdOpen}\n${test.error}\n${mdClose}\n`;
        if (test.trace) {
          markdown += `**Stack Trace:**\n\n${mdOpen}\n${test.trace}\n${mdClose}\n`;
        }
      });
    }
    if (this.passedTests.length > 0) {
      markdown += `\n---\n\n## ${this.passedTests.length} tests passed successfully! 🎉\n`;
      this.passedTests.forEach((test, index) => {
        markdown += `- ${index + 1}. ${test.title}\n`;
      });
    }

    writeFileSync(`${REPORT_DIR}/verify.report.md`, markdown);

    if (this.failedTests.length > 0) {
      console.log(`\n❌ ${this.failedTests.length} test(s) failed:`);
      this.failedTests.forEach((test) => {
        console.log(`  - ${test.title} (${test.file})`);
        console.log(`    ${test.error}`);
      });
    } else {
      console.log('\n✅ All tests passed!');
    }
  }
}
