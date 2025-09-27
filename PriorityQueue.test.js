import { PriorityQueue } from './PriorityQueue.js';

// Simple test framework
class TestRunner {
    constructor() {
        this.tests = [];
        this.passedTests = 0;
        this.failedTests = 0;
    }

    test(name, testFunction) {
        this.tests.push({ name, testFunction });
    }

    assertEqual(actual, expected, message = '') {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
        }
    }

    assertTrue(condition, message = '') {
        if (!condition) {
            throw new Error(`${message}\nExpected true but got ${condition}`);
        }
    }

    assertFalse(condition, message = '') {
        if (condition) {
            throw new Error(`${message}\nExpected false but got ${condition}`);
        }
    }

    assertUndefined(value, message = '') {
        if (value !== undefined) {
            throw new Error(`${message}\nExpected undefined but got ${value}`);
        }
    }

    run() {
        console.log('🧪 Running PriorityQueue Tests...\n');
        console.log('='.repeat(60));

        this.tests.forEach((test, index) => {
            try {
                test.testFunction();
                console.log(`✅ Test ${index + 1}: ${test.name}`);
                this.passedTests++;
            } catch (error) {
                console.log(`❌ Test ${index + 1}: ${test.name}`);
                console.log(`   Error: ${error.message}\n`);
                this.failedTests++;
            }
        });

        console.log('='.repeat(60));
        console.log(`📊 Test Results: ${this.passedTests} passed, ${this.failedTests} failed`);
        
        if (this.failedTests === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.log('⚠️  Some tests failed. Please check the implementation.');
        }
    }
}

// Test Suite
const runner = new TestRunner();

// Test 1: Constructor and initial state
runner.test('Constructor creates empty priority queue', () => {
    const pq = new PriorityQueue();
    runner.assertEqual(pq.size(), 0, 'Initial size should be 0');
    runner.assertUndefined(pq.top(), 'Top of empty queue should be undefined');
    runner.assertTrue(Array.isArray(pq.values), 'Values should be an array');
});

// Test 2: Single element operations
runner.test('Push and pop single element', () => {
    const pq = new PriorityQueue();
    pq.push('station1', 'red', ['route1'], 10);
    
    runner.assertEqual(pq.size(), 1, 'Size should be 1 after push');
    
    const top = pq.top();
    runner.assertEqual(top.stationId, 'station1', 'Top element stationId should match');
    runner.assertEqual(top.priority1, 10, 'Top element priority1 should match');
    runner.assertEqual(top.priority2, Infinity, 'Default priority2 should be Infinity');
    
    const popped = pq.pop();
    runner.assertEqual(popped.stationId, 'station1', 'Popped element should match');
    runner.assertEqual(pq.size(), 0, 'Size should be 0 after pop');
});

// Test 3: Multiple elements with single priority
runner.test('Multiple elements sorted by single priority', () => {
    const pq = new PriorityQueue();
    
    // Push in random order
    pq.push('station3', 'green', ['route3'], 30);
    pq.push('station1', 'red', ['route1'], 10);
    pq.push('station4', 'blue', ['route4'], 40);
    pq.push('station2', 'yellow', ['route2'], 20);
    
    runner.assertEqual(pq.size(), 4, 'Size should be 4');
    
    // Should pop in priority order (lowest first)
    runner.assertEqual(pq.pop().stationId, 'station1', 'First pop should be station1 (priority 10)');
    runner.assertEqual(pq.pop().stationId, 'station2', 'Second pop should be station2 (priority 20)');
    runner.assertEqual(pq.pop().stationId, 'station3', 'Third pop should be station3 (priority 30)');
    runner.assertEqual(pq.pop().stationId, 'station4', 'Fourth pop should be station4 (priority 40)');
});

// Test 4: Dual priority comparison
runner.test('Dual priority comparison works correctly', () => {
    const pq = new PriorityQueue();
    
    // Same priority1, different priority2
    pq.push('station1', 'red', ['route1'], 10, 5);
    pq.push('station2', 'blue', ['route2'], 10, 3);
    pq.push('station3', 'green', ['route3'], 10, 7);
    
    runner.assertEqual(pq.size(), 3, 'Size should be 3');
    
    // Should pop by priority2 when priority1 is equal
    runner.assertEqual(pq.pop().stationId, 'station2', 'Should pop station2 (priority2=3)');
    runner.assertEqual(pq.pop().stationId, 'station1', 'Should pop station1 (priority2=5)');
    runner.assertEqual(pq.pop().stationId, 'station3', 'Should pop station3 (priority2=7)');
});

// Test 5: Mixed priority scenarios
runner.test('Mixed single and dual priorities', () => {
    const pq = new PriorityQueue();
    
    pq.push('station1', 'red', ['route1'], 10);      // priority2 = Infinity
    pq.push('station2', 'blue', ['route2'], 10, 5);  // priority2 = 5
    pq.push('station3', 'green', ['route3'], 5);     // priority2 = Infinity
    
    // Should pop station3 first (priority1=5), then station2 (priority1=10, priority2=5), then station1 (priority1=10, priority2=Infinity)
    runner.assertEqual(pq.pop().stationId, 'station3', 'Should pop station3 first (lowest priority1)');
    runner.assertEqual(pq.pop().stationId, 'station2', 'Should pop station2 second (same priority1, lower priority2)');
    runner.assertEqual(pq.pop().stationId, 'station1', 'Should pop station1 last (same priority1, highest priority2)');
});

// Test 6: Edge cases
runner.test('Edge cases - empty operations', () => {
    const pq = new PriorityQueue();
    
    runner.assertUndefined(pq.pop(), 'Pop from empty queue should return undefined');
    runner.assertUndefined(pq.top(), 'Top of empty queue should be undefined');
    runner.assertEqual(pq.size(), 0, 'Size should remain 0');
});

// Test 7: Large dataset performance test
runner.test('Large dataset maintains heap property', () => {
    const pq = new PriorityQueue();
    const testSize = 100;
    
    // Push random priorities
    for (let i = 0; i < testSize; i++) {
        const priority = Math.floor(Math.random() * 1000);
        pq.push(`station${i}`, 'line', ['route'], priority);
    }
    
    runner.assertEqual(pq.size(), testSize, `Size should be ${testSize}`);
    
    // Pop all elements and verify they come out in sorted order
    let lastPriority = -1;
    let count = 0;
    
    while (pq.size() > 0) {
        const element = pq.pop();
        runner.assertTrue(element.priority1 >= lastPriority, 
            `Priority should be non-decreasing: ${element.priority1} >= ${lastPriority}`);
        lastPriority = element.priority1;
        count++;
    }
    
    runner.assertEqual(count, testSize, `Should have popped ${testSize} elements`);
});

// Test 8: Heap property verification
runner.test('Heap property maintained after operations', () => {
    const pq = new PriorityQueue();
    
    // Add elements
    pq.push('a', 'red', ['route'], 15);
    pq.push('b', 'blue', ['route'], 10);
    pq.push('c', 'green', ['route'], 20);
    pq.push('d', 'yellow', ['route'], 5);
    pq.push('e', 'purple', ['route'], 25);
    
    // Verify heap property: parent <= children
    const verifyHeapProperty = (index = 0) => {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        
        if (leftChild < pq.values.length) {
            const parentCompareLeft = pq.compare(pq.values[index], pq.values[leftChild]);
            runner.assertTrue(parentCompareLeft <= 0, 
                `Parent should be <= left child: ${pq.values[index].priority1} <= ${pq.values[leftChild].priority1}`);
            verifyHeapProperty(leftChild);
        }
        
        if (rightChild < pq.values.length) {
            const parentCompareRight = pq.compare(pq.values[index], pq.values[rightChild]);
            runner.assertTrue(parentCompareRight <= 0, 
                `Parent should be <= right child: ${pq.values[index].priority1} <= ${pq.values[rightChild].priority1}`);
            verifyHeapProperty(rightChild);
        }
    };
    
    verifyHeapProperty();
});

// Test 9: Compare function edge cases
runner.test('Compare function handles edge cases', () => {
    const pq = new PriorityQueue();
    
    const a = { priority1: 10, priority2: 5 };
    const b = { priority1: 10, priority2: 5 };
    const c = { priority1: 10, priority2: 3 };
    const d = { priority1: 5, priority2: 10 };
    
    runner.assertEqual(pq.compare(a, b), 0, 'Equal priorities should return 0');
    runner.assertTrue(pq.compare(a, c) > 0, 'Higher priority2 should return positive');
    runner.assertTrue(pq.compare(c, a) < 0, 'Lower priority2 should return negative');
    runner.assertTrue(pq.compare(d, a) < 0, 'Lower priority1 should return negative');
    runner.assertTrue(pq.compare(a, d) > 0, 'Higher priority1 should return positive');
});

// Test 10: Metro routing simulation
runner.test('Metro routing simulation with real-world data', () => {
    const pq = new PriorityQueue();
    
    // Simulate metro routing with time and interchange count
    pq.push('kashmere_gate', 'red', ['route1'], 300, 0);      // 5 min, 0 interchanges
    pq.push('chandni_chowk', 'yellow', ['route2'], 420, 1);   // 7 min, 1 interchange
    pq.push('rajiv_chowk', 'blue', ['route3'], 300, 1);      // 5 min, 1 interchange
    pq.push('connaught_place', 'yellow', ['route4'], 480, 0); // 8 min, 0 interchanges
    
    // Should prioritize by time first, then by interchange count
    const first = pq.pop();
    runner.assertEqual(first.stationId, 'kashmere_gate', 'Should prefer route with less time and no interchanges');
    
    const second = pq.pop();
    runner.assertEqual(second.stationId, 'rajiv_chowk', 'Should prefer route with same time but fewer interchanges');
    
    const third = pq.pop();
    runner.assertEqual(third.stationId, 'chandni_chowk', 'Should be third option');
    
    const fourth = pq.pop();
    runner.assertEqual(fourth.stationId, 'connaught_place', 'Should be last option');
});

// Test 11: Stress test with alternating priorities
runner.test('Stress test with alternating insert/delete operations', () => {
    const pq = new PriorityQueue();
    
    // Add some initial elements
    for (let i = 0; i < 10; i++) {
        pq.push(`initial${i}`, 'line', ['route'], i * 10);
    }
    
    // Alternate between adding and removing
    for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
            pq.push(`dynamic${i}`, 'line', ['route'], Math.floor(Math.random() * 100));
        } else {
            if (pq.size() > 0) {
                pq.pop();
            }
        }
    }
    
    // Verify final state maintains heap property
    let lastPriority = -1;
    while (pq.size() > 0) {
        const element = pq.pop();
        runner.assertTrue(element.priority1 >= lastPriority, 
            'Elements should come out in sorted order');
        lastPriority = element.priority1;
    }
});

// Test 12: Zero and negative priorities
runner.test('Handle zero and negative priorities correctly', () => {
    const pq = new PriorityQueue();
    
    pq.push('negative', 'red', ['route'], -10, -5);
    pq.push('zero1', 'blue', ['route'], 0, 0);
    pq.push('zero2', 'green', ['route'], 0, 5);
    pq.push('positive', 'yellow', ['route'], 10, 2);
    
    runner.assertEqual(pq.pop().stationId, 'negative', 'Negative priority should come first');
    runner.assertEqual(pq.pop().stationId, 'zero1', 'Zero with lower secondary priority should come second');
    runner.assertEqual(pq.pop().stationId, 'zero2', 'Zero with higher secondary priority should come third');
    runner.assertEqual(pq.pop().stationId, 'positive', 'Positive priority should come last');
});

// Run all tests
runner.run();