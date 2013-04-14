import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Queue;

/* implement this class for all three strategies */

public abstract class AllocationStrategy {
	protected ArrayList<Job> Jobs;
	protected ArrayList<Job> Queue;
	
	public AllocationStrategy(ArrayList<Job> jobs) {
		super();
		Jobs = jobs;
	}
	
	public abstract void run();
		// update current job by 1 tick 
		// check if the job queue might need to be changed.
		// check for jobs to add to the queue
}
